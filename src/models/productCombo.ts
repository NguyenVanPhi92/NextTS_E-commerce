import { Wishlist } from "./user";
import { Unit, ProductAttribute, PriceTable } from "./product";
export type ProductComboDetail = ProductComboDetailRes & ProductCombo;

export interface ProductCombo {
	type: "combo";
	id: number;
	id_product_att?: number;
	name: string;
	uom: Unit;
	uom_categ: boolean;
	wishlist: boolean;
	company_id: number;
	company_name: string;
	attributes?: ProductAttribute[];
	vat: number;
	price_list: {
		type: "percentage" | "fixed";
		min_quantity: number;
		value: number;
	}[];
	price: number;
	seller_price: number;
	discount: number;
	price_discount: number;
	price_table: PriceTable[];
	description_sale: string;
	description_combo: string;
	price_orgin: number | boolean;
	price_total: number;
	image_url: Array<string>;
}

export interface ProductComboDetailRes {
	id: number;
	name: string;
	uom: boolean | Unit | number;
	uom_categ: boolean;
	price: number;
	image: Array<string>;
	description_sale: string;
	wholesales: string;
	discount: number;
	type: "combo";
	star_rating: number;
	rating_count: number;
	sales_count: number;
	comment_count: number;
	description_combo: string;
	list_products: ComboProductItem[] | [];
}

export interface ProductComboSlice {
	combo: ProductCombo;
	viewedCombos: ProductCombo[];
}

export interface ComboProductItem {
	id: number;
	product_tmpl_id: number;
	name: string;
	image_url: Array<string>;
	quantity_is: number;
	reduced_price: number;
	qty_uom: string;
}
