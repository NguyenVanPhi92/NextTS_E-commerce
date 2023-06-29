import { RootState } from "@/core/store";
import { Product } from "@/models";
import productApi from "@/services/productApi";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Spinner } from "../common";
import { ProductSlide } from "./productSlide";

interface ProductRelatedProps {
	categoryId: number;
	productTmplId: number;
}

export const ProductRelated = ({
	categoryId,
	productTmplId,
}: ProductRelatedProps) => {
	const partner_id = useSelector(
		(state: RootState) => state.user.userInfo?.id || 0
	);

	const { data, isValidating } = useSWR<Product[] | undefined>(
		"get_related_products",
		() =>
			productApi
				.getProductList({
					category_id: Number(categoryId),
					limit: 12,
					partner_id,
				})
				.then((res: any) => {
					const products: Product[] = res?.result?.data?.products || [];
					return [...products].filter((item) => item.id !== productTmplId);
				}),
		{}
	);

	if (isValidating)
		return (
			<div className="product__detail-related product__detail-item">
				<Spinner />
			</div>
		);

	if (!data || data?.length === 0) return null;
	return (
		<div className="product__detail-related product__detail-item">
			<h3 className="product__detail-heading">Sản Phẩm liên quan</h3>
			<ProductSlide products={data} />
		</div>
	);
};
