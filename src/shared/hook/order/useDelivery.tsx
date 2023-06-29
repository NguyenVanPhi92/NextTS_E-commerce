import { RootState } from "@/core/store"
import { Delivery } from "@/models"
import { setOpenScreenLoading } from "@/modules"
import orderApi from "@/services/orderApi"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR, { KeyedMutator } from "swr"

interface GetDeliveryDetailProps {
  carrier_id: number
  handleSuccess: Function
}

interface ConfirmDeliveryProps {
  delivery: {
    carrier_id: number
    delivery_message?: string
  }
  showScreenLoading?: boolean
  handleSuccess: Function
}

interface DeliverySWR {
  data: Delivery[]
  error: any
  isValidating: boolean
  getDeliveryDetail: (props: GetDeliveryDetailProps) => void
  confirmDelivery: (props: ConfirmDeliveryProps) => void
  mutate: KeyedMutator<any>
}

interface UseDeliveryProps {
  order_id: number
}

const useDelivery = ({ order_id }: UseDeliveryProps): DeliverySWR => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)

  const { data, error, isValidating, mutate } = useSWR(
    token && order_id ? `get_delivery_${order_id}` : null,
    () => orderApi.getDeliveryList({ sale_id: order_id }).then((res: any) => res.result?.data || [])
  )

  const confirmDelivery = async ({
    handleSuccess,
    delivery,
    showScreenLoading = true,
  }: ConfirmDeliveryProps) => {
    if (!token) return

    showScreenLoading && dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await orderApi.confirmDelivery({
        sale_carrier: [
          {
            carrier_id: delivery.carrier_id,
            sale_id: order_id,
          },
        ],
        payment_type: "2",
        required_note: "KHONGCHOXEMHANG",
        delivery_message: delivery?.delivery_message || "",
      })

      showScreenLoading && dispatch(setOpenScreenLoading(false))

      if (res?.result?.success) {
        handleSuccess()
      } else {
        dispatch(
          notify(res.result?.data?.message || "Vui lòng chọn phương thức vận chuyển khác", "error")
        )
      }
    } catch (error) {
      showScreenLoading && dispatch(setOpenScreenLoading(false))
    }
  }

  const getDeliveryDetail = async (props: GetDeliveryDetailProps) => {
    const { carrier_id, handleSuccess } = props

    if (!token || !carrier_id) return

    const res: any = await orderApi.getDetailDelivery({
      carrier_id,
      sale_id: order_id,
    })

    const result = res.result

    if (result?.success) {
      handleSuccess({ ...result.data, carrier_id })
    } else {
      dispatch(notify(result.message || res.error?.data?.message || "", "error"))
    }
  }

  return {
    data,
    error,
    isValidating,
    getDeliveryDetail,
    confirmDelivery,
    mutate,
  }
}

export { useDelivery }
