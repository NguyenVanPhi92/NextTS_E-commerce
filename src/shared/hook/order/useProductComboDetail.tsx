import { RootState } from "@/core/store";
import { getListAttributeId, mergeProductAndProductDetail } from "@/helper";
import {
	ProductCombo,
	ProductDetailRes,
	ProductComboDetail,
	ProductComboDetailRes,
} from "@/models";
import productApi from "@/services/productApi";
import { useSelector } from "react-redux";
import useSWR, { KeyedMutator } from "swr";

interface Res {
	data: ProductComboDetail | undefined;
	isValidating: boolean;
	clearProductCombo: Function;
	isInitialLoading: boolean;
	mutate: KeyedMutator<any>;
}

interface Props {
	type: "detail" | "modal";
	initialValue?: ProductCombo;
}

const useProductComboDetail = ({ type, initialValue }: Props): Res => {
	const { userInfo } = useSelector((state: RootState) => state.user);
	const { isValidating, data, mutate, error } = useSWR<any>(
		(type === "detail" && userInfo?.id) || type === "modal"
			? `get_product_combo_detail_${initialValue?.id || 0}`
			: null,
		() =>
			productApi
				.getProductComboDetail({
					partner_id: userInfo?.id,
					product_id: initialValue.id || 0,
					type: "combo",
				})
				.then((res: any) => {
					const productDetail: ProductComboDetailRes =
						res?.result?.data?.detail;
					return productDetail;
				})
				.catch((err) => console.log(err)),
		{
			dedupingInterval: 1000,
			revalidateOnFocus: false,
			fallbackData: initialValue,
		}
	);

	const clearProductCombo = () => {
		mutate(undefined, false);
	};

	return {
		data,
		isValidating,
		clearProductCombo,
		isInitialLoading: data === undefined && error === undefined,
		mutate,
	};
};

export { useProductComboDetail };
