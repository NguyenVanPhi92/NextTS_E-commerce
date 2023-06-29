import { RootState } from "@/core/store";
import {
	getListAttributeId,
	isObjectHasValue,
	mergeProductAndProductDetail,
} from "@/helper";
import {
	AttributeWithParentIdAndName,
	GetProductDetail,
	Product,
	ProductCombo,
	ProductDetail,
	ProductDetailRes,
} from "@/models";
import productApi from "@/services/productApi";
import { useSelector } from "react-redux";
import useSWR, { KeyedMutator } from "swr";

interface Res {
	data: ProductDetail | undefined;
	isValidating: boolean;
	clearProduct: Function;
	isInitialLoading: boolean;
	mutate: KeyedMutator<any>;
	getProductVariation: (
		product: GetProductDetail & {
			listAttribute: AttributeWithParentIdAndName[];
		}
	) => void;
}

interface Props {
	type: "detail" | "modal";
	initialValue?: ProductDetail | Product | ProductCombo;
}

const useProductDetail = ({ type, initialValue }: Props): Res => {
	const { userInfo } = useSelector((state: RootState) => state.user);
	const { isValidating, data, mutate, error } = useSWR<any>(
		(type === "detail" && userInfo?.id) || type === "modal"
			? `get_product_detail_${
					(initialValue as Product)?.id_product_att ||
					(initialValue as ProductCombo)?.id ||
					0
			  }`
			: null,
		() =>
			productApi
				.getProductDetail({
					partner_id: userInfo?.id,
					list_products: initialValue
						? [getListAttributeId(initialValue as ProductDetail)]
						: [],
					product_id:
						(initialValue as Product)?.id_product_att ||
						(initialValue as ProductCombo).id ||
						0,
				})
				.then((res: any) => {
					const productDetail: ProductDetailRes = res?.result?.data?.detail;
					return {
						...mergeProductAndProductDetail({
							product: initialValue as Product,
							productDetail,
						}),
						price: productDetail?.price || initialValue?.price || 0,
					};
				})
				.catch((err) => console.log(err)),
		{
			dedupingInterval: 1000,
			revalidateOnFocus: false,
			fallbackData: initialValue,
		}
	);

	const getProductVariation = (
		params: GetProductDetail & { listAttribute: AttributeWithParentIdAndName[] }
	) => {
		productApi
			.getProductDetail({
				...params,
				partner_id: userInfo?.id || 0,
			})
			.then((res: any) => {
				const productDetail: ProductDetailRes = res.result.data.detail;
				if (isObjectHasValue(productDetail)) {
					mutate(
						mergeProductAndProductDetail({
							productDetail,
							product: data,
						}),
						false
					);
				}
			});
	};

	const clearProduct = () => {
		mutate(undefined, false);
	};

	return {
		data,
		isValidating,
		clearProduct,
		isInitialLoading: data === undefined && error === undefined,
		mutate,
		getProductVariation,
	};
};

export { useProductDetail };
