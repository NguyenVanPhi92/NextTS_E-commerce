import { PriceTable, ProductAttribute, Unit } from "./product"
import { ComboProductItem } from "./productCombo"

export interface CartItem {
  type: "product" | "combo"
  company_id: number
  company_name: string
  is_check: boolean
  product_id: number
  product_templ_id: number
  product_name: string
  image_url: Array<string>
  price: number
  discount?: number
  price_discount?: number
  product_qty: number
  price_table: PriceTable[]
  uom?: Unit
  uom_categ?: Unit[]
  attributes: ProductAttribute[]
  variant: Variant[]
  vat?: number
  description_sale?: string
  description_combo?: string
  list_products?: ComboProductItem[]
}

export interface Variant {
  parentId: number
  parentName: string
  id: number
  name: string
  price: number
}

export interface ReplaceVariantReq {
  current_variant_id: number
  newVariant: CartItem
}

export interface ProductListItem {
  company_id: number
  company_name: string
  products: CartItem[]
}

export interface CartSlice {
  product: []
}

export interface CartRes {
  company: {
    company_id: number
    company_name: string
  }
  product: CartItem[]
  last_update: string
}

export interface DeleteCartItems {
  company_id: number
  product_ids: number[]
}
