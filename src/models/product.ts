import { TIME_TYPE } from "./common";
import { Wishlist } from "./user";
import { ProductCombo } from "./productCombo";

export interface Unit {
	id: number;
	name: string;
}

export interface UnitSelect {
	value: number;
	label: string;
}

export interface Attribute {
	id: number;
	name: string;
	price: number;
}

export interface ProductAttribute {
	id: number;
	name: string;
	values: Attribute[];
}

export interface AttributeWithParentIdAndName extends Attribute {
	parentId: number;
	parentName: string;
}

export interface SearchHistory {
	id: number;
	keyword: string;
}

export interface PriceTable {
	uom_id: number;
	name: string;
	price_unit: number;
}

export interface Product {
	type: "product";
	id: number;
	id_product_att: number;
	name: string;
	barcode: string | boolean;
	product_available: number;
	star_rating: number;
	uom: Unit;
	uom_categ: Unit[];
	vat: number;
	description: string;
	description_sale?: string;
	price: number;
	price_orgin: number;
	price_list: {
		type: "percentage" | "fixed";
		min_quantity: number;
		value: number;
	}[];
	seller_price: number;
	sales_count: number;
	price_table: PriceTable[];
	attributes: ProductAttribute[];
	image_url: Array<string>;
	representative_image: Array<string>;
	variant_id?: number;
	company_id: number;
	company_name: string;
	price_origin: number;
	price_discount: number;
	categ_name: string;
	categ_id: number;
	rating_count: number;
	comment_count: number;
	wishlist: boolean;
	price_words: string;
}

export interface ProductDetailRes {
	id: number;
	product_tmpl_id: number;
	name: string;
	type: "product";
	uom: Unit;
	uom_categ: Unit[];
	company_id: number;
	company_name: string;
	description_sale: string;
	wholesales: Array<string>;
	categ_id: number;
	barcode: string;
	product_available: number;
	price: number;
	seller_price: number;
	image_url: Array<string>;
	qty_available: number;
	category: ProductDetailCategory;
	star_rating: 0.0;
}

export type ProductDetail = ProductDetailRes & Product;

export interface ProductDetailCategory {
	id: number;
	name: string;
}

export interface IOffset {
	offset: number;
}

export type LimitProduct = 6 | 12 | 24 | 36 | 48 | number;

export interface ISearch {
	keyword: string;
}

export type TypeGet =
	| "price_reduction"
	| "price_increase"
	| "new"
	| "top_sale"
	| "combo"
	| "sale"
	| "";

export interface ProductParams {
	type_get?: TypeGet;
	limit?: LimitProduct;
	offset?: number;
	keyword?: string;
	category_id?: number | false;
	product_id?: number;
	partner_id?: number;
	attribute_ids?: AttributeReq[];
}

export interface ProductSearch {
	id: number;
	type: string;
	name: string;
	company_id: boolean | string;
	company_name: boolean | string;
	vat: number;
	price_list_ids: number;
	price_list: Array<number>;
	seller_price: number;
	categ_name: string;
	price: number;
	image_url: Array<string>;
}

export interface ProductCompare {
	id: number;
	name: string;
	product_available: number;
	uom: {
		id: number;
		name: string;
	};
	categ_name: string;
	company_name: string | boolean;
	description: string;
	price: number;
	price_orgin: number;
	seller_price: number;
	image_url: string;
}

export interface Category {
	id: number;
	name: string;
	icon: string;
	url?: string | boolean;
	image: Array<string>;
	parent_id: number | boolean;
	description: string | boolean;
	children: Category[];
}

export interface ParentChildCategoryList {
	parent_category: Category[];
	child_category: Category[];
}

export interface InitialStateProduct {
	partner_id: number;

	products: {
		data: Product[];
		isLoading: boolean;
	};

	productDetail?: {
		data: ProductDetail;
		isLoading: boolean;
		image_url: Array<string>;
	};
	asideLeftProducts: {
		isLoading: boolean;
		data: Product[];
	};
	categories: {
		data: Category[];
		isLoading: boolean;
	};
	shopProducts: {
		data: Product[];
		isLoading: boolean;
		isLimit: boolean;
		isLoadingMore: boolean;
		isPageChange: boolean;
		limit: number;
	};
	relatedProducts: {
		data: Product[];
		isLoading: boolean;
	};
	searchProducts: {
		data: Product[];
		isLoading: boolean;
		isOpen: false;
		keyword: string;
	};
	topProducts: {
		data: Product[];
		isLoading: boolean;
	};
	variantsProductDetail: {
		attributes: AttributeWithParentIdAndName[] | undefined;
	};
	bannerUrls: Array<string>;
}

export interface AttributeProductValueItem {
	value_id: number;
	value_name: string;
	value_icon: string | boolean;
}

export type DisplayContentAttribute =
	| "min_max_value"
	| "only_text"
	| "star_rating"
	| "only_image"
	| "text_image";

export interface AttributeProduct {
	attribute_id: number;
	attribute_name: string;
	display_content: DisplayContentAttribute;
	min_value: number;
	max_value: number;
	attribute_icon: string | boolean;
	value_ids: AttributeProductValueItem[];
}

export interface AttributeReq {
	attribute_id: number;
	display_content: string;
	value_ids: Array<number>;
	min_value: number;
	max_value: number;
}

export interface ProductSale {
	deal_id: number;
	deal_name: string;
	deals_title: string;
	deal_description: string | boolean;
	start_date: string;
	end_date: string;
	banner: string | boolean;
	product_promotion: Product[];
}

export interface CartQuantity {
	id: number;
	quantity: number;
}

export interface ProductSlice {
	product: Product | ProductCombo | undefined;
	listAttribute: AttributeWithParentIdAndName[] | undefined;
	viewedProducts: Product[];
}

export interface ListAttributeId {
	id: number;
	lst_attributes_id: Array<number>;
}

export interface GetProductDetail {
	product_id: number;
	partner_id?: number;
	list_products?: ListAttributeId[];
	type?: string;
	uom_id?: number;
}

export interface IOffset {
	offset: number;
}

export interface ISortType {
	type_get: "price_reduction" | "price_increase" | "new" | "sale" | "";
}

export interface ISearch {
	keyword: string;
}

export interface ShopFiltterParams {
	type_get?: "price_reduction" | "price_increase" | "new" | "sale" | "";
	limit?: 12 | 24 | 36 | 48;
	offset?: number;
	keyword?: string;
	category_id?: number;
}

export interface DeleteWishlistHook {
	product: ProductDetail | Wishlist;
	shouldMutateProduct?: boolean;
}

export interface ProductIds {
	product_tmpl_id: number;
	product_prod_id: number;
}

export interface AttachmentProps {
	product_id: number;
	attachments: {
		file: string;
		type: "picture" | "video";
	}[];
}

export interface AttachmentParams {
	attachments: {
		file: string;
		type: "image" | "video";
	}[];
}

export interface PurchasedProductProps {
	limit?: number;
	offset?: number;
}

export type RatingRangePost = 1 | 2 | 3 | 4 | 5;

export type RatingRange = 0 | 1 | 2 | 3 | 4 | 5;

export interface UpdateRatingProps {
	product_id: number;
	star_rating: RatingRangePost;
	content: string;
	tag_ids?: Array<number>;
	image_ids?: Array<number>;
	attachment_ids?: Array<number>;
	limit?: number;
	offset?: number;
}

export interface UpdateRatingPropsWithLineId extends UpdateRatingProps {
	history_line_id: number;
}

export interface TagRating {
	tag_id: number;
	tag_content: string;
}

export interface DeleteRatingProps {
	history_line_id: number;
	product_id: number;
}

export interface DeleteRatingRes {
	history_line_id: number;
	comment_rating_id: number;
}

export interface PurchaseProduct {
	product_tmpl_id: number;
	product_id: number;
	product_name: string;
	qty_product: number;
	price_unit: number;
	amount_total: number;
	image_url: Array<string>;
}

export interface PurchasedProduct {
	history_line_id: number;
	sale_order: {
		sale_id: number;
		sale_name: string;
	};
	product: PurchaseProduct;
	comment_rating: CommentRating;
}

export interface DeleteRatingRes {
	history_line_id: number;
	comment_rating_id: number;
}

export interface RatingsByProduct {
	data_count: number;
	data: CommentRating[];
}

export type StarString = "1" | "2" | "3" | "4" | "5";

export interface CommentRating {
	comment_id: number;
	message: string | false;
	star_rating: StarString;
	star_rating_int: RatingRangePost;
	rating_tag: TagRating[];
	date: string;
	partner_id: number;
	partner_name: string;
	partner_avatar: string;
	content: string;
	product_id: {
		id: number;
		name: string;
	};
	time_duration: {
		time_value: number;
		time_type: TIME_TYPE;
	};
	editable: boolean;
	attachment_ids: {
		id: number;
		file: string;
		mimetype: "image/jpeg" | "image/png";
	}[];
	image_urls: {
		image_id: number;
		image_url: string;
	}[];
}

export interface GetRatingByProductProps {
	limit?: number;
	offset?: number;
	product_id: number;
	comment_type: ["comment" | "rating"];
}

export interface StarRating {
	star_rating: StarString;
	rating_count: number;
}

export interface GetRatingsByStarParams {
	product_tmpl_id: number;
	star_ratings: StarString[];
	offset?: number;
	limit?: number;
}

export interface ProductReviewForm {
	message: string;
}

export interface StoredProductIdAndCompanyId {
	stored_product_id: number;
	company_id: number;
}
