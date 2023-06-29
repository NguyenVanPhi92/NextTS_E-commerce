/* eslint-disable @next/next/no-img-element */
import { companyIcon } from "@/assets"
import { InputCheckbox } from "@/components"
import { Payment as IPayment } from "@/models"
import { selectOrderPayment, setOrderPayment } from "@/modules"
import { API_URL } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { useOrder, usePayment } from "shared/hook"

export const Payment = () => {
  const dispatch = useDispatch()
  const { data: paymentList = [] } = usePayment()
  const payment = useSelector(selectOrderPayment)
  const { updateOrderDraft } = useOrder()

  const handleAddPayment = (params: IPayment) => {
    if (params?.acquirer_id === payment?.acquirer_id) return
    updateOrderDraft({ params: { acquirer_id: params.acquirer_id } })

    dispatch(setOrderPayment(params))
  }

  return (
    <div className={`payment__order p-16 ${false ? "payment__order-disabled" : ""}`}>
      <h3 className="checkout-heading">Phương thức thanh toán</h3>

      <ul className="payment__order__list grid grid-col-1">
        {paymentList?.map(
          (item) =>
            item.state === "enabled" && (
              <li
                key={item.acquirer_id}
                onClick={() => handleAddPayment(item)}
                className={`payment__order__list-item ${
                  payment?.acquirer_id === item.acquirer_id
                    ? "payment__order__list-item-active"
                    : ""
                }`}
              >
                <InputCheckbox
                  type="radio"
                  isChecked={payment?.acquirer_id === item.acquirer_id}
                  onCheck={() => handleAddPayment(item)}
                />

                <div className="payment__order__list-item-content">
                  <img
                    src={item?.image_url ? `${API_URL}${item?.image_url || ""}` : companyIcon}
                    alt=""
                  />
                  <p>{item.name}</p>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  )
}
