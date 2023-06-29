import { RootState } from "@/core/store"
import { getCompanyIndexFromOrderLineList, isAllProductListChecked } from "@/helper"
import {
  ApplyPromotionRes,
  CartItem,
  Delivery,
  DraftOrderLine,
  OrderDraftRes,
  PayloadType,
  Payment,
  Promotion,
  PromotionLine,
  ReplaceVariantReq,
  ShippingAddress,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface IOrderSlice {
  address: ShippingAddress | undefined
  promotion: Promotion | undefined
  payment: Payment | undefined
  orderLineList: DraftOrderLine[]
}

const initialState: IOrderSlice = {
  orderLineList: [],
  promotion: undefined,
  address: undefined,
  payment: undefined,
}

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderLineNote: (state, { payload }: PayloadType<{ company_id: number; note: string }>) => {
      const index = getCompanyIndexFromOrderLineList(state.orderLineList, payload.company_id)
      if (index === -1) return

      state.orderLineList[index].note = payload.note
    },

    setOrderLineDelivery: (
      state,
      { payload }: PayloadType<{ company_id: number; delivery: Delivery | undefined }>
    ) => {
      const index = getCompanyIndexFromOrderLineList(state.orderLineList, payload.company_id)
      if (index === -1) return

      // Only set delivery if already has address and product list as well
      if (
        payload.delivery?.carrier_id &&
        (!state.orderLineList[index]?.productList?.length || !state.address?.id)
      )
        return

      state.orderLineList[index].delivery = payload.delivery
    },

    resetOrderDelivery: (state) => {
      state.orderLineList.forEach((item) => {
        if (item.delivery?.carrier_id) {
          item.delivery = undefined
        }
      })
    },

    setOrderLinePromotion: (
      state,
      {
        payload,
      }: PayloadType<{
        company_id: number
        promotion: ApplyPromotionRes | undefined
      }>
    ) => {
      const index = getCompanyIndexFromOrderLineList(state.orderLineList, payload.company_id)
      if (index === -1) return

      if (!state.orderLineList[index].productList?.length) return

      state.orderLineList[index].promotion = payload.promotion
    },

    setOrderLinePayment: (state, { payload }: PayloadType<{ payment: Payment | undefined }>) => {
      // if(!state.orderLineList.some(item => item.productList?.some(item => item.pr)))
      state.payment = payload.payment
    },

    setOrderLineOrderDraft: (state, { payload }: PayloadType<{ data: OrderDraftRes[] }>) => {
      payload.data.forEach((item) => {
        const index = getCompanyIndexFromOrderLineList(state.orderLineList, item?.company_id || 1)
        if (index !== -1) {
          state.orderLineList[index].orderDraft = item
        }
      })
    },

    deleteOrderLineOrderDraft: (state, { payload }: PayloadType<{ company_ids: number[] }>) => {
      payload.company_ids.forEach((item) => {
        const index = getCompanyIndexFromOrderLineList(state.orderLineList, item)
        if (index !== -1) {
          state.orderLineList[index].orderDraft = undefined
        }
      })
    },

    addProductItem: (state, { payload }: { payload: CartItem }) => {
      const companyIndex = state.orderLineList.findIndex(
        (item) => (item.company_id || 1) === (payload.company_id || 1)
      )
      if (companyIndex === -1) {
        state.orderLineList.push({
          company_id: payload.company_id,
          company_name: payload.company_name,
          productList: [payload],
        })
        return
      }

      const index = state.orderLineList[companyIndex].productList?.findIndex(
        (item) => item.product_id === payload.product_id
      )

      if (index === -1) {
        state.orderLineList[companyIndex].productList.unshift(payload)
      } else {
        state.orderLineList[companyIndex].productList[index] = payload

        if (
          state.orderLineList[companyIndex].productList[index].is_check &&
          state.orderLineList[companyIndex].orderDraft?.order_id
        ) {
          state.orderLineList[companyIndex].orderDraft = undefined
        }
      }
    },

    deleteOrderLineProductsAfterCreateOrderDone: (state) => {
      state.orderLineList.forEach((item, index) => {
        if (item.orderDraft?.order_id) {
          item.productList = item.productList.filter((_item) => !_item.is_check)

          // Also delete order line if products are empty
          if (!item?.productList?.length) {
            state.orderLineList.splice(index, 1)
          }
        }
      })
    },

    deleteProductItem: (state, { payload }: { payload: CartItem }) => {
      const companyIndex = getCompanyIndexFromOrderLineList(state.orderLineList, payload.company_id)
      if (companyIndex === -1) return

      // delete item from products[] in productList
      const productIndex = state.orderLineList[companyIndex].productList.findIndex(
        (item) => item.product_id === payload.product_id
      )

      // delete orderDraft as well
      if (
        state.orderLineList[companyIndex].orderDraft?.order_id &&
        state.orderLineList[companyIndex].productList[productIndex].is_check
      ) {
        state.orderLineList[companyIndex].orderDraft = undefined
      }

      state.orderLineList[companyIndex].productList.splice(productIndex, 1)

      if (!state.orderLineList?.[companyIndex]?.productList?.length) {
        state.orderLineList.splice(companyIndex, 1)
      }
    },

    replaceProductItem: (state, { payload }: { payload: ReplaceVariantReq }) => {
      const companyIndex = getCompanyIndexFromOrderLineList(
        state.orderLineList,
        payload.newVariant.company_id
      )
      if (companyIndex === -1) return

      const productIndex = state.orderLineList[companyIndex]?.productList.findIndex(
        (item) => item.product_id === payload.current_variant_id
      )

      // delete orderDraft as well
      if (
        state.orderLineList[companyIndex].orderDraft?.order_id &&
        state.orderLineList[companyIndex].productList[productIndex].is_check
      ) {
        state.orderLineList[companyIndex].orderDraft = undefined
      }

      if (productIndex >= 0) {
        state.orderLineList[companyIndex].productList[productIndex] = {
          ...payload.newVariant,
          is_check: state.orderLineList[companyIndex].productList[productIndex]?.is_check || false,
        }
      }
    },

    clearProductList: (state) => {
      state.orderLineList = []
    },

    toggleCheckProductItem: (state, { payload }: { payload: CartItem }) => {
      const companyIndex = getCompanyIndexFromOrderLineList(state.orderLineList, payload.company_id)
      if (companyIndex === -1) return

      if (state.orderLineList[companyIndex].orderDraft?.order_id) {
        state.orderLineList[companyIndex].orderDraft = undefined
      }

      state.orderLineList[companyIndex]?.productList.forEach((item) => {
        if (item.product_id === payload.product_id) {
          item.is_check = !item.is_check
        }
      })
    },

    toggleCheckAllProductInCompany: (state, { payload }: { payload: number }) => {
      const companyIndex = getCompanyIndexFromOrderLineList(state.orderLineList, payload)
      if (companyIndex === -1) return

      if (state.orderLineList[companyIndex].orderDraft?.order_id) {
        state.orderLineList[companyIndex].orderDraft = undefined
      }

      if (state.orderLineList[companyIndex]?.productList?.every((item) => item.is_check === true)) {
        state.orderLineList[companyIndex].productList.forEach((item) => {
          item.is_check = !item.is_check
        })
      } else {
        state.orderLineList[companyIndex].productList.forEach((item) => (item.is_check = true))
      }
    },

    toggleCheckAllProductList: (state) => {
      if (isAllProductListChecked(state.orderLineList)) {
        state?.orderLineList.forEach((item, index) => {
          if (state.orderLineList?.[index]?.orderDraft?.detail_order) {
            state.orderLineList[index].orderDraft = undefined
          }
          item?.productList?.forEach((cartItem) => (cartItem.is_check = false))
        })
      } else {
        state?.orderLineList.forEach((item, index) => {
          if (state.orderLineList?.[index]?.orderDraft?.detail_order) {
            state.orderLineList[index].orderDraft = undefined
          }
          item?.productList?.forEach((cartItem) => (cartItem.is_check = true))
        })
      }
    },

    // Address
    setOrderAddress: (state, { payload }: { payload: ShippingAddress | undefined }) => {
      if (state?.address?.id !== payload.id) {
        state.orderLineList.forEach((item) => {
          item.delivery = undefined
        })
      }

      state.address = payload
    },

    // Payment
    setOrderPayment: (state, { payload }: { payload: Payment | undefined }) => {
      if (payload?.acquirer_id === state?.payment?.acquirer_id) return
      state.payment = payload
    },

    resetOrderData: (state) => {
      state.address = undefined
      state.payment = undefined
      state.orderLineList = []
      state.promotion = undefined
    },

    clearOrderLineData: (state, { payload }: PayloadType<{ company_id: number }>) => {
      state.orderLineList = state.orderLineList.filter(
        (item) => (item.company_id || 1) !== (payload.company_id || 1)
      )
    },
  },
})

export const selectOrderAddress = (state: RootState) => state.order.address
export const selectOrderPayment = (state: RootState) => state.order.payment
export const selectOrderPromotion = (state: RootState) => state.order.promotion
export const selectOrderLineList = (state: RootState) => state.order.orderLineList

export const selectAllPromotionLineList = (state: RootState) => {
  const promotions: ApplyPromotionRes[] = []

  state.order.orderLineList.forEach((item) => {
    if (item?.promotion?.description?.id_promotion) {
      promotions?.push(item.promotion)
    }
  })

  return promotions
}

export const selectOrderLineListHasProducts = (state: RootState) => {
  return state.order.orderLineList.filter((item) =>
    item?.productList?.some((item) => item.is_check === true)
  )
}

export const selectOrderLineListHasOrderDraft = (state: RootState) =>
  state.order.orderLineList.filter((item) => item.orderDraft?.order_id)

export const selectOrderLineByCompany = (state: RootState, company_id: number) => {
  return state.order.orderLineList.find((item) => (item.company_id || 1) === (company_id || 1))
}

export const selectOrderProductList = (state: RootState) => {
  const products: CartItem[] = []
  state.order.orderLineList.forEach((item) => {
    item.productList.forEach((item) => products.push(item))
  })
  return products
}

export const selectOrderProductListChecked = (state: RootState) => {
  const products: CartItem[] = []
  state.order.orderLineList.forEach((item) => {
    item.productList.forEach((item) => {
      if (item.is_check) {
        products.push(item)
      }
    })
  })
  return products
}

export default OrderSlice.reducer
export const {
  setOrderAddress,
  setOrderPayment,
  clearProductList,
  addProductItem,
  deleteProductItem,
  toggleCheckProductItem,
  resetOrderData,
  clearOrderLineData,
  replaceProductItem,
  setOrderLinePromotion,
  setOrderLineOrderDraft,
  deleteOrderLineOrderDraft,
  toggleCheckAllProductInCompany,
  toggleCheckAllProductList,
  setOrderLinePayment,
  setOrderLineDelivery,
  setOrderLineNote,
  resetOrderDelivery,
  deleteOrderLineProductsAfterCreateOrderDone,
} = OrderSlice.actions
