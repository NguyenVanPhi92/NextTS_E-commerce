import { isArrayHasValue } from "@/helper";
import { Product } from "@/models";
import { useCart } from "shared/hook";
import { ProductItemLoading } from "../common/loader";
import { ProductItem } from "./productItem";
import { ProductItemList } from "./productItemList";

interface ProductCategoryProps {
	data: Product[];
	gridView: number;
	isLoading?: boolean;
}

export const ProductCategory = ({
	data,
	gridView,
	isLoading,
}: ProductCategoryProps) => {
	const { addProductToCart, getCartItemInProductList } = useCart();

	const handleAddToCart = (product: Product) => {
		const productExist = getCartItemInProductList(product.id_product_att);
		addProductToCart(
			product,
			(productExist?.product_qty ? productExist.product_qty : 0) + 1,
			[],
			"cart"
		);
	};

	return (
		<div
			className={`product__list-container grid ${
				gridView === 1 ? "" : `grid-col-2 grid-col-sm-3 grid-col-lg-3`
			} grid-col-xl-${gridView}`}
		>
			{isArrayHasValue(data) && !isLoading ? (
				<>
					{gridView === 1
						? data.map((product, index) => (
								<ProductItemList
									// isAddingToCart={currentProductLoading === product.product_prod_id}
									onAddToCart={handleAddToCart}
									key={index}
									product={product}
								/>
						  ))
						: data.map((product, index) => (
								<ProductItem
									// isAddingToCart={currentProductLoading === product.product_prod_id}
									onAddToCart={handleAddToCart}
									key={index}
									product={product}
								/>
						  ))}
				</>
			) : null}

			{/* Show when product status is fetching and has no data */}
			{isLoading
				? Array.from({ length: 24 }).map((_, index) => (
						<ProductItemLoading key={index} />
				  ))
				: null}
		</div>
	);
};
