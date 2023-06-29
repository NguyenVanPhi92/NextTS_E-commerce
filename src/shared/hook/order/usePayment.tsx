import { ConfirmTransactionParams, CreatePaymentParams, Payment } from "@/models"
import { selectToken, setOpenScreenLoading } from "@/modules"
import orderApi from "@/services/orderApi"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface PaymentSWR {
  data: Payment[]
  error: any
  isValidating: boolean
  confirmCheckout: (params: ConfirmTransactionParams, cb?: Function, onError?: Function) => void
  createPayment: (params: CreatePaymentParams, cb?: Function, onError?: Function) => void
}

const usePayment = (shouldFetch = true): PaymentSWR => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  const { data, error, isValidating } = useSWR(
    `get_payment_checkout`,
    token && shouldFetch
      ? () =>
          orderApi.getPaymentList().then((res: any) => {
            if (res?.result?.success) {
              return res.result.data
            } else {
              dispatch(notify(res.result.message, "error"))
            }
          })
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const createPayment = async (params: CreatePaymentParams, cb?: Function, onError?: Function) => {
    try {
      dispatch(setOpenScreenLoading(true))
      const res: any = await orderApi.createPayment(params)
      dispatch(setOpenScreenLoading(false))
      if (!res?.result?.success) {
        onError?.()
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra", "error"))
        return
      }
      cb?.(res?.result?.data)
    } catch (error) {
      console.log(error)
      onError?.()
      dispatch(setOpenScreenLoading(false))
    }
  }

  const confirmCheckout = async (
    params: ConfirmTransactionParams,
    cb?: Function,
    onError?: Function
  ) => {
    try {
      dispatch(setOpenScreenLoading(true))
      const res: any = await orderApi.confirmTransaction(params)
      dispatch(setOpenScreenLoading(false))
      if (!res?.result?.success) {
        onError?.()
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra", "error"))
        return
      }
      cb?.(res?.result?.data)
    } catch (error) {
      onError?.()
      console.log(error)
      dispatch(setOpenScreenLoading(false))
    }
  }

  return {
    data,
    error,
    isValidating,
    confirmCheckout,
    createPayment,
  }
}

export { usePayment }
