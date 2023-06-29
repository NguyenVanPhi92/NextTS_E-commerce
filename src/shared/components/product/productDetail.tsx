import {
	changeReactSelectTypeToUomType,
	changeUomCateTypeToReactSelectType,
	changeUomTypeToReactSelectType,
	convertProductDetailToProductType,
	formatMoneyVND,
	getAttributeList,
	getPriceProduct,
	isArrayHasValue,
} from "@/helper";
import { AttributeWithParentIdAndName, ProductDetail as IProductDetail, Unit } from "@/models";
import { addProductCompare } from "@/modules";
import { API_URL } from "@/services";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiArrowUpDownLine, RiLoader2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "reapop";
import { useCart, useProductDetail, useWishlist } from "shared/hook";
import ButtonWishlist from "../common/button/buttonAddWishlist";
import ButtonShare from "../common/button/buttonShare";
import { Star } from "../common/star";
import { InputQuantity } from "../inputs";
import ProductImg from "./productImage";
import { ProductVariation } from "./productVariation";
import Select, { OptionProps, SelectComponentsConfig } from "react-select";

interface ProductDetailProps {
	product: IProductDetail;
	type?: "modal" | "detail";
}

export const ProductDetail = ({ product, type = "detail" }: ProductDetailProps) => {
	const dispatch = useDispatch();

	const divRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { addProductToCart, getCartItemInProductList } = useCart();
	const { addWishlist, deleteWishlist, isFetching: isWishlistLoading } = useWishlist();

	const { getProductVariation } = useProductDetail({
		type: "detail",
		initialValue: product,
	});

	const [isAddLoading, setAddLoading] = useState<boolean>(false);
	const [openVariantModal, setOpenVariantModal] = useState<"buy" | "cart" | "">();
	const [quantity, setQuantity] = useState<number>(1);
	const [productUom, setProductUom] = useState<Unit>(product.uom);

	const [attributes, setAttributes] = useState<AttributeWithParentIdAndName[]>(() =>
		isArrayHasValue(product.attributes) ? getAttributeList(product) : []
	);
	// Functions
	const handleChangeVariantAttribute = (att: AttributeWithParentIdAndName) => {
		const newAttributes = attributes?.map((item) => (item.parentId === att.parentId ? att : item));
		setAttributes(newAttributes);

		getProductVariation({
			product_id: product.id_product_att,
			list_products: [
				{
					id: product.product_tmpl_id,
					lst_attributes_id: newAttributes.map((item) => item.id),
				},
			],
			listAttribute: newAttributes,
			uom_id: productUom.id,
		});
	};

	const handleChangeProductUom = (newUom: Unit) => {
		if (newUom.id === productUom.id) return;
		setProductUom(newUom);

		getProductVariation({
			product_id: product.id_product_att,
			list_products: [
				{
					id: product.product_tmpl_id,
					lst_attributes_id: attributes.map((item) => item.id),
				},
			],
			listAttribute: attributes,
			uom_id: newUom.id,
		});
	};

	const handleToggleWishlist = () => {
		if (product?.wishlist) {
			console.log("call delete wl");

			deleteWishlist({ product });
		} else {
			console.log("call add wl");

			addWishlist({ product });
		}
	};

	const handleAddToCompareList = () => {
		dispatch(addProductCompare(product));
		dispatch(notify("Đã thêm vào danh sách so sánh", "success"));
	};

	const handleAddToCart = (productDetail: IProductDetail, type: "buy" | "cart") => {
		const productExist = getCartItemInProductList(productDetail.id);

		addProductToCart(
			{
				...convertProductDetailToProductType(productDetail),
				uom: productUom,
			},
			(productExist?.product_qty ? productExist.product_qty : 0) + quantity,
			attributes,
			type
		);

		if (type === "buy") {
			router.push("/cart");
			return;
		}
	};

	return (
		<>
			<div className="modal__product-content">
				{isArrayHasValue(product.image_url) ? (
					<ProductImg isStock={product.qty_available > 0} type={type} images={product.image_url} />
				) : null}

				<div ref={divRef} className="product__intro">
					<div className="modal__product-header">
						<p className="modal__product-title">{product.name}</p>

						<div className="modal__product-sub">
							<p className="modal__product-sub-item modal__product-sub-item-star">
								<Star ratingValue={product.star_rating * 20} size={16} readonly />
							</p>
							<p className="hidden sm:block text-[red] modal__product-sub-item modal__product-sub-item-rating">
								{product.rating_count} đánh giá
							</p>
							<p className="modal__product-sub-item">{product.sales_count} Đã bán</p>
							<p className="hidden sm:block modal__product-sub-item modal__product-sub-item-comment">
								{product.comment_count} bình luận
							</p>
						</div>

						<div className="modal__product-sub">
							<p className="modal__product-sub-item modal__product-sub-item-rating flex items-center">
								Tồn kho <span className="hidden sm:block ml-[3px]"> khả dụng</span>:{" "}
								{product.product_available}
							</p>
							<p className="modal__product-sub-item modal__product-sub-item-comment">
								Barcode: {product.barcode}
							</p>
						</div>
					</div>

					<div className="product__intro-price">
						<div className="product__intro-price-wrapper">
							<p className="product__intro-price-current">
								{formatMoneyVND(getPriceProduct(product) * quantity)}
							</p>

							<span className="product__intro-price-unit">
								/ {quantity > 1 ? quantity : ""} {product?.uom?.name}
							</span>
						</div>
					</div>

					{product?.attributes && product.attributes.length > 0 ? (
						<div className="product__intro-variation-wrapper">
							{product.attributes.map((att) => (
								<ProductVariation
									onChangeAttribute={(id) => {
										handleChangeVariantAttribute(id);
									}}
									attribute={att}
									key={att.id}
								/>
							))}
						</div>
					) : null}

					{product?.uom_categ && product?.uom_categ.length > 0 ? (
						<div className="product__intro-quantity">
							<p>Đơn vị</p>

							<div style={{ minWidth: "150px" }}>
								<Select
									isSearchable={false}
									classNamePrefix="uom-select"
									components={{ IndicatorSeparator: () => null }}
									defaultValue={changeUomTypeToReactSelectType(product.uom)}
									options={changeUomCateTypeToReactSelectType(product.uom_categ)}
									onChange={(val) => handleChangeProductUom(changeReactSelectTypeToUomType(val))}
								/>
							</div>
						</div>
					) : null}

					<div className="product__intro-quantity">
						<p>Số lượng</p>
						<InputQuantity quantity={quantity} onChangeQuantity={(q: number) => setQuantity(q)} />
					</div>

					<div className="product__intro-shop">
						<button
							onClick={() => setOpenVariantModal("buy")}
							className="btn-primary product__intro-shop-cart-btn show-on-md"
						>
							<span>Mua ngay</span>
						</button>

						<button
							onClick={() => handleAddToCart(product, "buy")}
							className="btn-primary product__intro-shop-cart-btn hide-on-md"
						>
							<span>Mua ngay</span>
						</button>

						<button
							onClick={() => handleAddToCart(product, "cart")}
							className="product__intro-shop-btn"
						>
							{isAddLoading ? (
								<RiLoader2Line className="loader" />
							) : (
								<>
									<FaShoppingBasket />
									<span>Thêm giỏ hàng</span>
								</>
							)}
						</button>

						<button
							onClick={() => setOpenVariantModal("cart")}
							className="product__intro-shop-btn-sm product__intro-shop-cart-mobile"
						>
							<FaShoppingBasket />
							<span>Thêm giỏ hàng</span>
						</button>
					</div>

					<div className="product__intro-bottom">
						<div className="product__intro-sub">
							<ButtonWishlist
								isLoading={isWishlistLoading}
								status={product?.wishlist}
								onChange={() => handleToggleWishlist()}
							/>

							<button onClick={handleAddToCompareList} className="product__intro-sub-item">
								<RiArrowUpDownLine />
							</button>
						</div>

						<div className="product__intro-bottom-separate"></div>
						<ButtonShare
							product_id={product.product_tmpl_id}
							imageUrl={`${process.env.REACT_APP_API_URL}${product?.image_url[0] || ""}`}
							name={product.name}
							description={product.description}
						/>
					</div>
				</div>
			</div>

			{openVariantModal ? (
				<>
					<div className="product__variant-modal">
						<header className="product__variant-modal-header">
							<div className="product__variant-modal-header-left">
								{product?.image_url?.[0] ? (
									<div className="image-container">
										<Image
											src={`${API_URL}${product?.image_url?.[0] || ""}`}
											alt=""
											layout="fill"
											className="image"
										/>
									</div>
								) : null}

								<p>
									{formatMoneyVND((product.price || 0) * quantity)}
									<span>/</span>
									<span>
										{quantity} {product.uom.name}
									</span>
								</p>
							</div>

							<button onClick={() => setOpenVariantModal("")} className="btn-reset">
								<IoClose />
							</button>
						</header>

						{product.attributes?.length > 0 ? (
							<div className="product__variant-modal-variants">
								{product.attributes.map((att) => (
									<ProductVariation
										onChangeAttribute={(att) => {
											handleChangeVariantAttribute(att);
										}}
										attribute={att}
										key={att.id}
									/>
								))}
							</div>
						) : null}

						<div className="product__variant-modal-quantity">
							<p>Số lượng</p>
							<InputQuantity quantity={quantity} onChangeQuantity={(q: number) => setQuantity(q)} />
						</div>

						<div className="product__variant-modal-btn">
							<button
								onClick={() => handleAddToCart(product, openVariantModal)}
								className="btn-primary"
							>
								{isAddLoading ? (
									<RiLoader2Line className="loader" />
								) : (
									<span>{openVariantModal === "buy" ? "Mua ngay" : "Thêm giỏ hàng"}</span>
								)}
							</button>
						</div>
					</div>

					<div
						onClick={() => setOpenVariantModal("")}
						className="product__variant-modal-overlay"
					></div>
				</>
			) : null}
		</>
	);
};
