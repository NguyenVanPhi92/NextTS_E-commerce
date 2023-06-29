import { RootState } from "@/core/store"
import { ShippingAddress } from "@/models"
import { setAddressDefault, setAddressForm, setOpenModalAddressForm } from "@/modules"
import { useRef, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useClickOutside, useUserAddress } from "shared/hook"

interface IAddressItem {
  isActive?: boolean
  address: ShippingAddress
}

export const AddressItem = ({ isActive, address }: IAddressItem) => {
  const { deleteAddress } = useUserAddress(false)
  const dispatch = useDispatch()
  const optionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useClickOutside([optionRef, buttonRef], () => setOpenOption(false))

  const {
    token,
    userInfo: { id: partner_id = 0 } = { userInfo: undefined },
    addressDefault,
  } = useSelector((state: RootState) => state.user)
  const [openOption, setOpenOption] = useState<boolean>(false)

  // Function
  const handleChangeDefault = () => {
    if (addressDefault?.id === address.id) {
      dispatch(setAddressDefault(undefined))
    } else {
      dispatch(setAddressDefault(address))
    }
    setOpenOption(false)
  }

  const handleDeleteAddress = () => {
    if (!token || !partner_id) return

    deleteAddress({ partner_id, adress_id: address.id }).then(() => {
      setOpenOption(false)
    })
  }

  const handleUpdateAddress = () => {
    if (!address) return
    dispatch(setOpenModalAddressForm(true))
    dispatch(setAddressForm(address))
  }

  return (
    <div className={`address__item ${isActive ? "address__item-active" : ""}`}>
      {isActive ? (
        <span className="address__item-active-label">
          <AiFillStar />
        </span>
      ) : null}

      <div className="address__item-option-wrapper">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation()
            setOpenOption(!openOption)
          }}
          className="btn-reset address__item-btn"
        >
          <HiOutlineDotsVertical />
        </button>

        {openOption ? (
          <div ref={optionRef} className="address__item-option">
            <p onClick={handleDeleteAddress}>{"Xóa địa chỉ này"}</p>
            <p onClick={handleChangeDefault}>
              {addressDefault && addressDefault.id === address.id
                ? "Xóa khỏi mặc định"
                : "Đặt làm mặc định"}
            </p>

            <p onClick={handleUpdateAddress}>{"Sửa địa chỉ này"}</p>
          </div>
        ) : null}
      </div>

      <ul className="address__item-list">
        <li className="address__item-list-item">
          <p className="address__item-list-item-text address__item-list-item-text-name">
            {address.name}
          </p>
        </li>

        <li className="address__item-list-item">
          <p className="address__item-list-item-title">{"Địa chỉ: "}</p>
          <p className="address__item-list-item-text">{address.full_adress}</p>
        </li>

        <li className="address__item-list-item">
          <p className="address__item-list-item-title">{"Điện thoại: "}</p>
          <p className="address__item-list-item-text">{address.phone}</p>
        </li>
      </ul>
    </div>
  )
}
