import { ProductSaleItem } from "@/components";
import { isArrayHasValue } from "@/helper";
import { Product, ProductSale } from "@/models";
import productApi from "@/services/productApi";
import { useCart } from "shared/hook";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSWR from "swr";

export const ProductSaleContainer = () => {
	const { addProductToCart, getCartItemInProductList } = useCart();

	const {
		data: productSales,
		isValidating,
		mutate,
	} = useSWR(
		"product_deals",
		() =>
			productApi.getSaleProductList().then((res: any) => {
				if (isArrayHasValue(res?.result?.data)) {
					return res?.result?.data;
				}
				return [];
			}),
		{
			revalidateOnFocus: false,
		}
	);

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
		<>
			{productSales && productSales?.length > 0 ? (
				<div className="home__sale-container">
					{productSales?.map((product: ProductSale) => (
						<ProductSaleItem
							currentProductLoading={product.deal_id || undefined}
							onAddToCart={handleAddToCart}
							key={product.deal_id}
							isLoading={isValidating}
							setProductsSale={(deal_id: number) =>
								mutate([
									...productSales.filter(
										(item: ProductSale) => item.deal_id !== deal_id
									),
									,
									false,
								])
							}
							productSale={product}
						/>
					))}
				</div>
			) : null}
		</>
	);
};
