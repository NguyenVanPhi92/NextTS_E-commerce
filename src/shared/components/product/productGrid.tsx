import { Product } from "@/models";
import { useCart } from "shared/hook";
import { ProductItemLoading } from "../common";
import { ProductItem } from "./productItem";

interface ProductGridProps {
	data: Product[];
	isLoading?: boolean;
}

export const ProductGrid = ({ data, isLoading }: ProductGridProps) => {
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

	if (!isLoading && !data?.length) return null;
	return (
		<div className="home__content-products-grid grid grid-col-2 grid-col-sm-3 grid-col-md-4 grid-col-lg-5">
			{!isLoading
				? data.map((product, index) => (
						<ProductItem
							onAddToCart={handleAddToCart}
							isLoading={isLoading}
							key={index}
							product={product}
						/>
				  ))
				: Array.from({ length: 12 }).map((_, index) => <ProductItemLoading key={index} />)}
		</div>
	);
};
