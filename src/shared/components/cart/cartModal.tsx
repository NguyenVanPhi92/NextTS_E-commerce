import { cartEmptyIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { selectOrderProductList, setOpenCartModal, setOpenModalConfirm } from "@/modules"
import Link from "next/link"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCart } from "shared/hook"
import { ModalConfirm } from "../modal"
import { CartItem } from "./cartItem"
import { CartItem as ICartItem } from "@/models"

export const CartModal = () => {
  const dispatch = useDispatch()
  const { getTotalCartPrice, deleteCartItem } = useCart()
  const productList = useSelector(selectOrderProductList)
  const [currentDeleteCartItem, setCurrentDeleteCartItem] = useState<ICartItem | undefined>()

  const handleCloseModal = () => {
    dispatch(setOpenCartModal(false))
  }

  const handleDeleteCartItem = (cartItem: ICartItem) => {
    setCurrentDeleteCartItem(cartItem)
    dispatch(
      setOpenModalConfirm({
        isOpen: true,
        title: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      })
    )
  }

  return (
    <div className="cart__modal">
      {
        <>
          {productList?.length > 0 ? (
            <>
              <div className="cart__modal-list">
                {productList.map((cart, index) => (
                  <CartItem
                    className="mb-12"
                    onDelete={(cart) => handleDeleteCartItem(cart)}
                    handleClose={handleCloseModal}
                    key={index}
                    data={cart}
                  />
                ))}
              </div>
              <div className="cart__modal-bottom">
                <div className="cart__modal-bottom-price">
                  <p>Tổng:</p>
                  <p>{formatMoneyVND(getTotalCartPrice())}</p>
                </div>
                <div className="cart__modal-bottom-actions">
                  <Link passHref href="/cart">
                    <a
                      onClick={() => handleCloseModal && handleCloseModal()}
                      className="cart__modal-bottom-actions-item cursor-pointer"
                    >
                      Xem giỏ hàng
                    </a>
                  </Link>

                  <Link href="/cart">
                    <a
                      onClick={() => handleCloseModal && handleCloseModal()}
                      className="cart__modal-bottom-actions-item cursor-pointer"
                    >
                      Thanh toán
                    </a>
                  </Link>
                </div>
              </div>

              {currentDeleteCartItem?.product_id ? (
                <ModalConfirm
                  onConfirm={() => {
                    deleteCartItem(currentDeleteCartItem)
                    setCurrentDeleteCartItem(undefined)
                    dispatch(setOpenModalConfirm({ isOpen: false, title: "" }))
                  }}
                />
              ) : null}
            </>
          ) : (
            <div className="cart__modal-empty">
              {cartEmptyIcon}
              <p className="cart__modal-empty-title">Không có sản phẩm nào trong giỏ hàng</p>
            </div>
          )}
        </>
      }
    </div>
  )
}
