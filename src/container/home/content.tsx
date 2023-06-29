import { ProductItem, ProductItemLoading, ProductComboItem } from "@/components";
import { isArrayHasValue } from "@/helper";
import { GetPostsParams, PostRes, Product, ProductCombo } from "@/models";
import newsApi from "@/services/newsApi";
import { useProduct, useProductCombo, useCart, useQueryList } from "shared/hook";
import { HomeSlideProduct } from "./homeSlide";
import { FirstRankNews, SecondRankNews, ThirdRankNews } from "./hotNews";

export const MainContent = () => {
	const { addProductToCart, addComboToCart, getCartItemInProductList, isAddingToCart } = useCart();

	const { data: topProducts, isValidating: isTopLoading } = useProduct({
		key: "top_products",
		params: {
			type_get: "sale",
			limit: 12,
			offset: 0,
		},
	});
	const { data: newProducts, isValidating: isNewProductLoading } = useProduct({
		key: "products",
		params: {
			type_get: "new",
			limit: 12,
			offset: 0,
		},
	});
	const { data: productsCombo, isValidating: isProductsComboLoading } = useProductCombo({
		key: "productsCombo",
		params: {
			type_get: "combo",
			limit: 12,
			offset: 0,
		},
	});

	const { data: news, isValidating: isValidatingNews } = useQueryList<PostRes, GetPostsParams>({
		key: "get_list_news",
		fetcher: newsApi.getPosts,
		initialParams: { categoryId: "" },
	});

	const [firstNews, secondNews, thirdNews, ...othersNews] = news || [];

	const handleAddProductToCart = (product: Product) => {
		const productExist = getCartItemInProductList(product.id_product_att);
		addProductToCart(
			product,
			(productExist?.product_qty ? productExist.product_qty : 0) + 1,
			[],
			"cart"
		);
	};

	const handleAddComboToCart = (combo: ProductCombo) => {
		const comboExist = getCartItemInProductList(combo.id);
		addComboToCart(combo, (comboExist?.product_qty ? comboExist.product_qty : 0) + 1, "cart");
	};

	return (
		<section className="home__content">
			<div className="home__content-right">
				<HomeSlideProduct
					path="/products/top/&type_get=top_sale"
					name="Combo"
					title="Tiết kiệm hơn với những combo cực hot"
					isLoading={isProductsComboLoading && !isArrayHasValue(productsCombo)}
				>
					<div className="home__content-products-grid grid grid-col-2 grid-col-sm-3 grid-col-lg-4 grid-col-1024-5 grid-col-xl-6">
						{!isProductsComboLoading && isArrayHasValue(productsCombo)
							? productsCombo
									.slice(0, 12)
									.map((productCombo, index) => (
										<ProductComboItem
											productCombo={productCombo}
											onAddToCart={handleAddComboToCart}
											isLoading={isTopLoading}
											isAddingToCart={isAddingToCart === productCombo.id}
											key={index}
										/>
									))
							: Array.from({ length: 12 }).map((_, index) => <ProductItemLoading key={index} />)}
					</div>
				</HomeSlideProduct>

				<HomeSlideProduct
					path="/products/top/&type_get=top_sale"
					name="Bán Chạy"
					title="Đừng bỏ lỡ nhưng ưu đãi mới nhất"
					isLoading={isTopLoading && !isArrayHasValue(topProducts)}
				>
					<div className="home__content-products-grid grid grid-col-2 grid-col-sm-3 grid-col-lg-4 grid-col-1024-5 grid-col-xl-6">
						{!isTopLoading && isArrayHasValue(topProducts)
							? topProducts
									.slice(0, 12)
									.map((product, index) => (
										<ProductItem
											isAddingToCart={false}
											onAddToCart={handleAddProductToCart}
											isLoading={isTopLoading}
											key={index}
											product={product}
										/>
									))
							: Array.from({ length: 12 }).map((_, index) => <ProductItemLoading key={index} />)}
					</div>
				</HomeSlideProduct>

				<HomeSlideProduct
					name="Sản phẩm mới"
					title="Những sản phẩm mới nhất đến từ shop"
					path="/products/new&type_get=new"
					isLoading={isNewProductLoading && !isArrayHasValue(newProducts)}
				>
					<div className="home__content-products-grid grid grid-col-2 grid-col-sm-3 grid-col-lg-4 grid-col-1024-5 grid-col-xl-6">
						{!isNewProductLoading && isArrayHasValue(newProducts)
							? newProducts
									.slice(0, 12)
									.map((product, index) => (
										<ProductItem
											isAddingToCart={false}
											onAddToCart={handleAddProductToCart}
											isLoading={isTopLoading}
											key={index}
											product={product}
										/>
									))
							: Array.from({ length: 12 }).map((_, index) => <ProductItemLoading key={index} />)}
					</div>
				</HomeSlideProduct>

				{news ? (
					<HomeSlideProduct
						name="Tin Nổi Bật"
						path="/news"
						isLoading={isNewProductLoading && !isArrayHasValue(news)}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-custom">
							<div className="lg:col-span-3">{firstNews && <FirstRankNews data={firstNews} />}</div>
							<div className="lg:col-span-2">
								{secondNews && <SecondRankNews data={secondNews} />}
								{thirdNews && <SecondRankNews data={thirdNews} />}
							</div>
							<div className="md:col-span-2 h-[400px] overflow-auto">
								{othersNews &&
									othersNews.map((newsItem) => (
										<ThirdRankNews key={newsItem.postId} data={newsItem} />
									))}
							</div>
						</div>
					</HomeSlideProduct>
				) : null}
			</div>
		</section>
	);
};
