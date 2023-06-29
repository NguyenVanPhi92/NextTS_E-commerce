import {
  ApplyPromotion,
  CancelPromotion,
  ConfirmDelivery,
  ConfirmTransactionParams,
  CreateOrderDoneRes,
  CreatePaymentParams,
  GetDeliveryListProps,
  GetPriceOfDeliveryProps,
  OrderDone,
  OrderDraftPost,
  OrderDraftRes,
  UpdateOrderDraft,
} from "@/models"
import { AxiosResponse } from "axios"
import axiosClient from "."

const orderApi = {
  createOrderDraft: (
    order: OrderDraftPost
  ): Promise<AxiosResponse<{ sale_order_id: OrderDraftRes[] }>> => {
    return axiosClient.post("/api/v2.0/order/order_draft", {
      params: order,
    })
  },

  getDeliveryList: (params: GetDeliveryListProps) => {
    return axiosClient.post("/delivery_carrier/get_available_carrier", {
      params: params,
    })
  },

  getDetailDelivery: (params: GetPriceOfDeliveryProps) => {
    return axiosClient.post("/delivery_carrier/update_delivery_price", {
      params: params,
    })
  },

  confirmDelivery: (params: ConfirmDelivery) => {
    return axiosClient.post("/delivery_carrier/confirm_delivery_carrier", {
      params: params,
    })
  },

  getPaymentList: () => {
    return axiosClient.post("/vnpay_controller/get_payment_method_in_app", { params: {} })
  },

  createOrderDone: (
    params: OrderDone
  ): Promise<AxiosResponse<{ sale_order_id: CreateOrderDoneRes[] }>> => {
    return axiosClient.post("/api/v2.0/order/order_done", { params: params })
  },

  applyPromotion: (params: ApplyPromotion) => {
    return axiosClient.post("/promotion_api/apply_promotion", {
      params: params,
    })
  },

  createPayment: (params: CreatePaymentParams) => {
    return axiosClient.post("/vnpay_controller/create_payment", {
      params: params,
    })
  },

  getVNPAYStatusPayment: (params: { sale_order_id: number }) => {
    return axiosClient.post("/payment/vnpay/get_status_payment", {
      params: params,
    })
  },

  confirmTransaction: (params: ConfirmTransactionParams) => {
    return axiosClient.post("/payment/vnpay/confirm_transaction", {
      params: params,
    })
  },

  cancelPromotion: (params: CancelPromotion) => {
    return axiosClient.post("/promotion_api/cancel_promotion", {
      params: params,
    })
  },

  updateOrderDraft: (params: UpdateOrderDraft) => {
    return axiosClient.post("/api/v2.0/order/order_update", {
      params: params,
    })
  },
}

export default orderApi
