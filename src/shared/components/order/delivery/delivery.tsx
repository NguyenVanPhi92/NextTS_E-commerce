import { DeliveryItem } from "@/components"
import { RootState } from "@/core/index"
import { Delivery } from "@/models"
import { selectOrderAddress, selectOrderLineByCompany, setOrderLineDelivery } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useDelivery, useInputText } from "shared/hook"

interface DeliveryOrderProps {
  order_id: number
  company_id: number
}

export const DeliveryOrder = ({ order_id, company_id }: DeliveryOrderProps) => {
  const dispatch = useDispatch()
  const inputProps = useInputText("")
  const address = useSelector(selectOrderAddress)
  const { confirmDelivery, data } = useDelivery({ order_id })
  const orderLine = useSelector((state: RootState) => selectOrderLineByCompany(state, company_id))

  // Functions
  const handleAddDelivery = (deliveryProps: Delivery) => {
    if (!address) {
      dispatch(dispatch(notify("Bạn cần phải chọn địa chỉ giao hàng trước!", "warning")))
      return
    }
    if (orderLine.delivery?.carrier_id === deliveryProps.carrier_id) return

    confirmDelivery({
      delivery: {
        carrier_id: deliveryProps.carrier_id,
        delivery_message: inputProps.value,
      },
      handleSuccess: () => {
        dispatch(setOrderLineDelivery({ company_id, delivery: deliveryProps }))
      },
    })
  }

  return (
    <div className={`shipping__detail ${!address?.id ? "shipping__detail-disabled" : ""}`}>
      <h3 className="checkout-heading">Phương thức vận chuyển</h3>
      <ul className="shipping__detail-list grid grid-col-1 grid-col-md-3">
        {data?.map((item) => (
          <DeliveryItem
            disabled={!item.shipping_active}
            key={item.carrier_id}
            addDelivery={handleAddDelivery}
            delivery={item}
            isActive={orderLine?.delivery?.carrier_id === item.carrier_id}
          />
        ))}
      </ul>

      {/* <div className="shipping__detail-input">
        <input {...inputProps} placeholder="Lời nhắn cho đơn vị vận chuyển..." />
      </div> */}
    </div>
  )
}
