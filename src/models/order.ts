import { CartItem } from "./cart"
import { ApplyPromotionRes } from "./promotion"

export interface Payment {
  acquirer_id: number
  name: string
  provider: string
  state: string
  image_url: string
  vnpay_type: false | string
}

export interface ProductCompany {
  company_id: number
  coupon_code: string
  payment_term_id: number
  products: object
}

export interface OrderDraftDetail {
  id: number
  promotion_code: string
  partner_id: number
  combo_id: any
  order_line: any
  order_line_view: {
    product_id: number
    name: string
    qty: number
    product_uom: string
    price_unit: number
    product_discount: number
    discount_line: {
      type: "fixed" | "percent"
      value: number
    }
    price_total: number
    price_subtotal: number
  }[]
}

export interface OrderDraftRes {
  order_id: number
  company_id: number
  company_name: string
  detail_order: OrderDraftDetail
  amount_untaxed: number
  amount_tax: number
  promo_price: number
  reduce_price_combo_view: number
  discount_by_loyal: number
  amount_total: number
}

export interface DraftProductList {
  [key: string]: number | { id: number; qty: number }[]
}

export interface OrderDraftProduct {
  company_id: number
  payment_term_id?: number | null
  coupon_code?: string | null
  products: DraftProductList
  note?: string
}

export interface OrderDraftPost {
  api_version: "2.1"
  partner_shipping_id?: number | null
  // coupon_code?: string | null
  customer_id: number
  note?: string
  list_products: OrderDraftProduct[]
  // appointment_time?: string
  // image: null
  // latitude: null
  // list_combo: []
  // longitude: null
  // loyalty_point: 0
  // order_id: null
  // product_special: {}
}

export interface Delivery {
  carrier_id: number
  carrier_name: string
  shipping_fee: number
  shipping_active: boolean
  shipping_icon: string
  description: string
  note?: string
}

export interface DeliveryDetail {
  delivery_message: string
  delivery_price: number
  display_price: number
}

export interface DeliveryDetailWithId extends DeliveryDetail {
  carrier_id: number
}

export interface GetDeliveryListProps {
  sale_id: number
}

export interface SaleOrderId {
  sale_order_id: number
}

export interface OrderDone {
  order_id: Array<number>
}

export interface ConfirmDelivery {
  required_note: "KHONGCHOXEMHANG" | "CHOXEMHANGKHONGTHU" | "CHOTHUHANG"
  payment_type: "1" | "2"
  sale_carrier: {
    sale_id: number
    carrier_id: number
  }[]
  delivery_message?: string
}

export interface GetPriceOfDeliveryProps extends GetDeliveryListProps {
  carrier_id: number
}

export interface CreateOrderDraftProps {
  company_ids?: number[]
  handleSuccess?: (_: OrderDraftRes[]) => void
  handleError?: Function
  showLoading?: boolean
}

export interface CreatePaymentParams {
  acquirer_id: number
  sale_order_id: number
  returned_url: string
}

export interface ConfirmTransactionParams {
  sale_order_id: number
}

export interface DraftOrderLine {
  company_id: number
  company_name: string
  orderDraft?: OrderDraftRes | undefined | null
  delivery?: Delivery | undefined
  promotion?: ApplyPromotionRes | undefined
  note?: string | undefined
  productList: CartItem[]
}

export type DraftOrderLinePartial = Partial<DraftOrderLine> & {
  company_id: number
  company_name: string
}

export interface CreateOrderDoneRes {
  sale_order_id: number
  amount_total: number
  name: string
}

export type VnpayStatus =
  | "00"
  | "07"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "24"
  | "51"
  | "65"
  | "75"
  | "79"
  | "99"
