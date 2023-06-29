import { RootState } from "@/core/store"
import { productListToObjectIdQuantity, getCartItemsChecked } from "@/helper"
import { CreateOrderDoneRes, CreateOrderDraftProps, DraftOrderLine } from "@/models"
import {
  deleteOrderLineProductsAfterCreateOrderDone,
  resetOrderData,
  selectOrderAddress,
  selectOrderLineListHasOrderDraft,
  selectOrderLineListHasProducts,
  selectOrderPayment,
  setOpenScreenLoading,
  setOrderLineOrderDraft,
} from "@/modules"
import orderApi from "@/services/orderApi"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

interface UpdateOrderHook {
  handleSuccess?: Function
  showLoading?: boolean
  params: { partner_shipping_id?: number; acquirer_id?: number; company_id?: number }
}

interface ProductSWR {
  createOrderDraft: (props?: CreateOrderDraftProps) => void
  createOrderDone: (_: (_: CreateOrderDoneRes[]) => void) => void
  updateOrderDraft: (props: UpdateOrderHook) => void
}

const useOrder = (): ProductSWR => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.user.token)
  const customer_id = useSelector((state: RootState) => state.user.userInfo?.id)
  const payment = useSelector(selectOrderPayment)
  const address = useSelector(selectOrderAddress)
  const orderLineList = useSelector(selectOrderLineListHasProducts)
  const orderLineListHasOrderDraft = useSelector(selectOrderLineListHasOrderDraft)

  const createOrderDraft = async (orderDraftProps?: CreateOrderDraftProps) => {
    const { handleSuccess, handleError, showLoading = false, company_ids } = orderDraftProps || {}

    let newOrderLineList: DraftOrderLine[] = []

    if (company_ids?.length) {
      newOrderLineList = orderLineList.filter((item) => company_ids.includes(item.company_id))
    } else {
      newOrderLineList = orderLineList.filter((item) => !item?.orderDraft?.order_id)
    }
    if (!newOrderLineList?.length) return

    showLoading && dispatch(setOpenScreenLoading(true))

    try {
      const res = await orderApi.createOrderDraft({
        api_version: "2.1",
        customer_id: customer_id,
        list_products: newOrderLineList.map((item) => ({
          company_id: item?.company_id || 1,
          products: productListToObjectIdQuantity(getCartItemsChecked(item.productList)),
          //   coupon_code: item?.promotion?.promotion_code,
          note: item?.note || "",
          payment_term_id: payment?.acquirer_id,
        })),
      })

      showLoading && dispatch(setOpenScreenLoading(false))

      if (!res?.result?.success || (res as any)?.error) {
        dispatch(
          notify(res.result.message || "Đơn hàng vừa tạo có lỗi, vui lòng thử lại!", "error")
        )
        handleError?.()
        return
      }

      const data = res?.result?.data?.sale_order_id || []
      handleSuccess?.(data)
      dispatch(setOrderLineOrderDraft({ data }))
    } catch (error) {
      showLoading && dispatch(setOpenScreenLoading(false))
    }
  }

  // const handleAddPayment = async (paymentProps: Payment) => {
  //   if (paymentProps.provider === "vnpay") {
  //     createPayment(
  //       {
  //         sale_order_id: orderDraft.order_id,
  //         acquirer_id: paymentProps.acquirer_id,
  //         returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/checking-checkout-status?sale_order_id=${orderDraft.order_id}`,
  //       },
  //       (data: any) => {
  //         router.push({
  //           query: { sale_order_id: orderDraft.order_id },
  //         })
  //         window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
  //         // setToSessionStorage(COMPOUNDING_VNPAY_CODE, data.vnpay_code)
  //       }
  //     )
  //   } else {
  //     if (paymentProps?.acquirer_id !== payment?.acquirer_id) {
  //       updateOrderDraft({
  //         partner_shipping_id: address?.id,
  //         acquirer_id: paymentProps.acquirer_id,
  //         handleSuccess: () => {
  //           dispatch(setPayment(paymentProps))
  //         },
  //       })
  //     }
  //   }
  // }

  const createOrderDone = async (handleSuccess: (_: CreateOrderDoneRes[]) => void) => {
    if (!token) return

    if (!address?.id) {
      dispatch(notify("Bạn cần phải chọn địa chỉ trước!", "warning"))
      return
    }

    if (!orderLineList?.every((item) => item.orderDraft?.order_id && item?.delivery?.carrier_id)) {
      dispatch(notify("Bạn cần phải chọn phương thức vận chuyển trước!", "warning"))
      return
    }

    if (!payment?.acquirer_id) {
      dispatch(notify("Bạn cần phải chọn phương thức thanh toán trước!", "warning"))
      return
    }

    dispatch(setOpenScreenLoading(true))

    try {
      updateOrderDraft({
        params: {
          partner_shipping_id: address?.id,
          acquirer_id: payment.acquirer_id,
        },
        handleSuccess: async () => {
          const res = await orderApi.createOrderDone({
            order_id: orderLineListHasOrderDraft.map((item) => item.orderDraft?.order_id),
          })

          // Disabled loading status
          dispatch(setOpenScreenLoading(false))

          const result = res?.result
          if (result?.success) {
            dispatch(deleteOrderLineProductsAfterCreateOrderDone())
            dispatch(resetOrderData())
            handleSuccess(result?.data?.sale_order_id || [])
          } else {
            dispatch(notify(result?.message || "Có lỗi xảy ra!", "error"))
          }
        },
      })
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  const updateOrderDraft = async (props: UpdateOrderHook) => {
    const { handleSuccess, params, showLoading = true } = props
    const { partner_shipping_id, acquirer_id, company_id } = params

    let order_id: number[] = []

    if (company_id) {
      const orderLine = orderLineListHasOrderDraft.find((item) => item.company_id === company_id)
      if (!orderLine?.orderDraft?.order_id) {
        dispatch(notify("Đơn hàng chưa được tạo đơn nháp", "error"))
        return
      }

      order_id = [orderLine.orderDraft.order_id]
    } else {
      order_id = orderLineListHasOrderDraft.map((item) => item.orderDraft.order_id)
    }

    showLoading && dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await orderApi.updateOrderDraft({
        order_id,
        partner_shipping_id: partner_shipping_id || null,
        acquirer_id: acquirer_id || null,
      })

      showLoading && dispatch(setOpenScreenLoading(false))

      if (!res?.result) {
        dispatch(
          notify(res?.result?.message || "Vui lòng chọn phương thức vận chuyển khác", "error")
        )
        return
      }

      handleSuccess?.()
    } catch (error) {
      showLoading && dispatch(setOpenScreenLoading(false))
    }
  }

  return {
    createOrderDraft,
    createOrderDone,
    updateOrderDraft,
  }
}

export { useOrder }
