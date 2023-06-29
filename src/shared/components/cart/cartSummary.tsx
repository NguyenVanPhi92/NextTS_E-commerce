import { formatMoneyVND, getTotalPrice, isArrayHasValue } from "@/helper"
import {
  selectAllPromotionLineList,
  selectOrderAddress,
  selectOrderLineListHasProducts,
  selectOrderPayment,
  selectOrderProductListChecked,
  setOpenOrderSummaryModal,
} from "@/modules"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { RiArrowUpSLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useOrder } from "shared/hook"
import { CartSummaryProductList } from "./cartSummaryProductList"

interface CartTotalProps {
  showPromotion?: boolean
  view: "mobile" | "desktop"
}

export const CartSummary = ({ view }: CartTotalProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { createOrderDraft, createOrderDone } = useOrder()
  // const { createPayment } = usePayment()

  const orderLineList = useSelector(selectOrderLineListHasProducts)
  const promotionLineList = useSelector(selectAllPromotionLineList)
  const productList = useSelector(selectOrderProductListChecked)
  const payment = useSelector(selectOrderPayment)
  const address = useSelector(selectOrderAddress)

  const handleRedirectToCheckout = () => {
    if (!productList?.some((item) => item.is_check)) {
      dispatch(dispatch(notify("Vui lòng chọn sản phẩm để tiếp tục", "warning")))
      return
    }

    if (orderLineList?.every((item) => item?.orderDraft?.order_id)) {
      router.push("/checkout")
    } else {
      createOrderDraft({
        handleSuccess: () => router.push("/checkout"),
        showLoading: true,
      })
    }
  }

  const handleCreateOrder = () => {
    if (payment?.provider === "vnpay") {
      // createPayment(
      //   {
      //     sale_order_id: orderDraft.order_id,
      //     acquirer_id: paymentProps.acquirer_id,
      //     returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/checking-checkout-status?sale_order_id=${orderDraft.order_id}`,
      //   },
      //   (data: any) => {
      //     router.push({
      //       query: { sale_order_id: orderDraft.order_id },
      //     })
      //     window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
      //     // setToSessionStorage(COMPOUNDING_VNPAY_CODE, data.vnpay_code)
      //   }
      // )
    } else {
      createOrderDone((ids) => {
        let query = ""
        ids.forEach((item) => (query += `sale_order_id=${item.sale_order_id}&`))
        router.push(`/order-confirmed?${query.slice(0, query.length - 1)}`)
      })
    }
  }

  //Check the value a tion of the card on change

  const isValid = (): boolean => {
    return (
      payment?.acquirer_id &&
      address?.id &&
      orderLineList?.every((item) => item.orderDraft?.order_id && item?.delivery?.carrier_id)
    )
  }

  console.log(promotionLineList?.[0]?.promotion_line?.[0])

  const totalPromotion: { total_gift: number; total_value: number } = useMemo(() => {
    if (!promotionLineList?.length)
      return {
        total_gift: 0,
        total_value: 0,
      }

    const total = {
      total_gift: 0,
      total_value: 0,
    }

    promotionLineList?.forEach((item) => {
      item.promotion_line?.forEach((line) => {
        if (line?.discount_line?.type === "bogo_sale") {
          total.total_gift += line.price_unit
        } else if (line?.discount_line?.type === "fixed") {
          total.total_value += line?.discount_line?.value || 0
        } else if (line?.discount_line?.type === "percentage") {
          total.total_value += (line?.discount_line?.value / 100) * line.price_unit
        }
      })
    })

    return total
  }, [promotionLineList])

  return (
    <>
      {view === "desktop" ? (
        <div className="cart__summary-container">
          <div className="cart__body-total">
            <div className="cart__body-total-title bg-white">
              <h3 className="cart__body-total-title-heading">Sản phẩm</h3>

              {(productList?.length || 0) > 0 ? (
                <span className="cart__body-total-title-quantity">
                  ({productList?.length || 0})
                </span>
              ) : null}
            </div>

            <div className="cart__body-total-product bg-white">
              {productList ? <CartSummaryProductList productList={productList} /> : null}
            </div>

            {productList ? (
              <div className="cart__body-total-summary  bg-white">
                <div className="cart__body-total-subtotal">
                  <p className="cart__body-total-subtotal-title">{"Tổng phụ phí"}: </p>
                  <span>{formatMoneyVND(getTotalPrice(productList))}</span>
                </div>

                <div className="cart__body-total-subtotal">
                  <p className="cart__body-total-subtotal-title">Khuyến mãi: </p>
                  <span>
                    <span className="text-primary">
                      {formatMoneyVND(totalPromotion.total_value)}
                    </span>
                  </span>
                </div>

                <div className="cart__body-total-subtotal">
                  <p className="cart__body-total-subtotal-title">Khuyến mãi hàng tặng: </p>
                  <span>
                    <span className="text-primary">
                      {formatMoneyVND(totalPromotion.total_gift)}
                    </span>
                  </span>
                </div>

                <div className="cart__body-total-subtotal cart__summary-total">
                  <p className="cart__body-total-subtotal-title">Tổng:</p>
                  <span className="cart__body-total-price">
                    {formatMoneyVND(getTotalPrice(productList) - totalPromotion.total_value)}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="cart__summary-footer">
              {router.pathname === "/cart" ? (
                <button
                  style={{
                    cursor: productList?.length > 0 ? "pointer" : "default",
                  }}
                  onClick={() => handleRedirectToCheckout()}
                  className={`btn-primary cart__summary-footer-btn ${
                    !productList || !isArrayHasValue(productList) ? "opacity-50 cursor-default" : ""
                  }`}
                >
                  Mua hàng
                  {(productList?.length || 0) > 0 ? (
                    <span>{`(${productList?.length})`}</span>
                  ) : null}
                </button>
              ) : (
                <button
                  style={{
                    cursor: isValid() ? "pointer" : "default",
                  }}
                  onClick={handleCreateOrder}
                  className={`btn-primary cart__summary-footer-btn ${
                    !isValid() ? "opacity-50 cursor-default" : ""
                  }`}
                >
                  Đặt hàng
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="cart__summary-mobile">
          <div className="cart__summary-mobile-item cart__summary-mobile-promotion">
            {/* {showPromotion ? (
              <button
                onClick={handleOpenPromotionModal}
                className="btn-reset cart__summary-mobile-promotion-btn"
              >
                <RiCoupon3Fill /> Chọn mã giảm giá
              </button>
            ) : null} */}

            <button onClick={() => dispatch(setOpenOrderSummaryModal(true))} className="btn-reset">
              Xem chi tiết <RiArrowUpSLine />
            </button>
          </div>

          <div className="cart__summary-mobile-item cart__summary-mobile-body">
            <p className="cart__summary-mobile-body-price">
              <span className="cart__summary-mobile-body-price-title">Tổng tiền:</span>
              <span className="cart__summary-mobile-body-price-value">
                {formatMoneyVND(getTotalPrice(productList))}
              </span>
            </p>

            {router.pathname === "/cart" ? (
              <button
                onClick={handleRedirectToCheckout}
                className={`btn-primary ${(productList?.length || 0) === 0 ? "opacity-50" : ""}`}
              >
                Mua hàng
                {(productList?.length || 0) > 0 ? <span>({productList?.length})</span> : null}
              </button>
            ) : (
              <button
                onClick={handleCreateOrder}
                className={`btn-primary ${!isValid() ? "opacity-50" : ""}`}
              >
                Đặt hàng
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
