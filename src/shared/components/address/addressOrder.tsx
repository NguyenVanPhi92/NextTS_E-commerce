import { AddressOrderItem } from "@/components"
import { RootState } from "@/core/index"
import { ShippingAddress } from "@/models"
import {
  selectOrderAddress,
  selectOrderLineListHasOrderDraft,
  setOpenModalAddressForm,
  setOrderAddress,
} from "@/modules"
import Link from "next/link"
import { useEffect, useState } from "react"
import { HiPlus } from "react-icons/hi"
import { MdKeyboardArrowUp } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useOrder, useUserAddress } from "shared/hook"
import { mutate } from "swr"

export const AddressOrder = () => {
  const dispatch = useDispatch()
  const { data } = useUserAddress()
  const { updateOrderDraft } = useOrder()
  const addressOrder = useSelector(selectOrderAddress)
  const addressDefault = useSelector((state: RootState) => state.user.addressDefault)
  const [isShowAddress, setShowAddress] = useState<boolean>(!addressOrder)
  const orderLineList = useSelector(selectOrderLineListHasOrderDraft)

  const handleSetOrderAddress = async (address: ShippingAddress) => {
    if (addressOrder?.id === address.id) return

    updateOrderDraft({
      params: { partner_shipping_id: address.id },
      handleSuccess: () => {
        dispatch(setOrderAddress(address))
        setShowAddress(false)

        // refetch data
        orderLineList.forEach((item) => {
          mutate(`get_delivery_${item?.orderDraft?.order_id}`)
        })
      },
    })
  }

  useEffect(() => {
    if (!addressOrder?.id && addressDefault?.id) {
      // dispatch(setAddressDefault(addressDefault))
      updateOrderDraft({
        params: { partner_shipping_id: addressDefault.id },
        handleSuccess: () => {
          dispatch(setOrderAddress(addressDefault))
          setShowAddress(false)
          orderLineList.forEach((item) => {
            mutate(`get_delivery_${item?.orderDraft?.order_id}`)
          })
        },
        showLoading: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="checkout__address checkout-item">
      <div className="checkout__address-top">
        <div className="checkout__address-header">
          <h3 className="checkout-heading">Địa chỉ nhận hàng</h3>

          <div className="checkout__address-header-actions">
            <button
              onClick={() => dispatch(setOpenModalAddressForm(true))}
              className="btn-primary-outline"
            >
              <HiPlus className="mr-4" />
              Thêm địa chỉ
            </button>

            <Link href="/account/address">
              <a className="btn-primary-outline">Thiết lập địa chỉ</a>
            </Link>
          </div>
        </div>

        <div className="checkout__address-selected">
          {addressOrder ? (
            <AddressOrderItem readOnly address={addressOrder} />
          ) : (
            <p className="checkout__address--no-address">Vui lòng chọn địa chỉ giao hàng</p>
          )}

          {data?.shipping_adress?.length > 0 ? (
            <button onClick={() => setShowAddress(!isShowAddress)} className="btn-reset">
              Thay đổi
            </button>
          ) : null}
        </div>
      </div>

      {isShowAddress && data?.shipping_adress?.length > 0 ? (
        <>
          <div className="checkout__address-list">
            {data?.shipping_adress.map(
              (address) =>
                address.state_id && (
                  <AddressOrderItem
                    isActive={address?.id === addressOrder?.id}
                    onCheck={handleSetOrderAddress}
                    key={address.id}
                    address={address}
                  />
                )
            )}
          </div>

          <button
            onClick={() => setShowAddress(false)}
            className="btn-primary-outline checkout__address-back-btn"
          >
            Thu gọn <MdKeyboardArrowUp />
          </button>
        </>
      ) : null}
    </div>
  )
}
