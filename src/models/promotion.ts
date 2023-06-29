export interface PromotionReq {
  token?: string
  limit?: number
  offset?: number
  promotion_id: number
  coupon_code: string
  company_id?: number
  sale_order_id?: number
}

export interface PromotionDetailReq {
  promotion_id: number
}

export interface SearchPromotionReq {
  promotion_code: number
}

export interface SavePromotionReq {
  promotion_id: number
}

export interface CheckPromotionReq {
  sale_order_id: number
}

export interface TokenAndSaleOrderId {
  sale_order_id: number
}

export interface GetValuePromotionReq {
  order_lines: ListProduct
  coupon_code?: string
  promotion_id?: number
}

export interface ListProduct {
  product_id: number
  uom_id: number
  product_uom_qty: number
  price_unit: number
}

export interface Promotion {
  promotion_id: number
  promotion_code: string
  promotion_name: string
  promotion_brief: boolean
  promotion_type: "percentage" | "fixed"
  promotion_value: {
    value: number
    unit: string
  }
  date_start: string
  date_end: string
  duration_start: {
    time_value: number
    time_type: string
  }
  duration_end: {
    time_value: number
    time_type: string
  }
  promotion_image_url: {
    image_id: number
    image_url: string
  }
  promotion_banner_url: {
    image_id: number
    image_url: string
  }
}

export interface PromotionDetail extends Promotion {
  description: string
  special_time: {
    is_specific_time: boolean
    time_start: number
    time_end: number
  }
  promotion_process: {
    used_promo: number
    total_promo: number
  }
}

export interface PromotionByCompany {
  company_id: number
  promotion: Promotion
}

export interface CancelPromotion {
  sale_order_id: number
  company_id: number
}

export interface ApplyPromotion extends CancelPromotion {
  coupon_code: string | null
}

export interface UpdateOrderDraft {
  order_id: Array<number>
  partner_shipping_id: number | null
  acquirer_id: number | null
}

export interface PromotionLine {
  id: number
  name: string
  image: string
  qty: number
  product_uom: string
  price_unit: number
  is_promotion: boolean
  is_line_promotion: boolean
  discount_line: {
    type: "percentage" | "fixed" | "bogo_sale" | "range"
    value: number
  }
}

export interface ApplyPromotionRes {
  description: {
    id_promotion: number
    name_promotion: string
    line_has_is_promotion: string
    line_has_is_line_promotion: string
  }
  no_promotion_line: PromotionLine &
    {
      price_total: number
      price_subtotal: number
    }[]
  promotion_line: PromotionLine[]
}
