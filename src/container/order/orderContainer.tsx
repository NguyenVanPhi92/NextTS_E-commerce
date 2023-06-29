import { CartSummary, HeaderMobile } from "@/components"
import { RootState } from "@/core/store"
import { setOpenOrderSummaryModal } from "@/modules"
import { ReactNode } from "react"
import { VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"

interface IOrderContainer {
  children: ReactNode
  showPromotion?: boolean
  isShowOrderSummary?: boolean
  headerTitle: string
}

export const OrderContainer = ({
  children,
  showPromotion = true,
  isShowOrderSummary = true,
  headerTitle,
}: IOrderContainer) => {
  const dispatch = useDispatch()
  const isOpenOrderSummary = useSelector((state: RootState) => state.common.isOpenOrderSummary)

  return (
    <>
      <HeaderMobile centerChild={<p>{headerTitle}</p>} />

      <section
        className={`order__container ${!isShowOrderSummary ? "order__container--no-margin" : ""}`}
      >
        <div className="container">
          <div className="order-wrapper">
            <div className="order__body">
              <div className="order__body-left">{children}</div>
              <div className="order__body-right">
                <CartSummary view="desktop" showPromotion={showPromotion} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart summry fixed bottom in mobile */}
      {isShowOrderSummary ? (
        <div className="cart__summary-mobile-wrapper">
          <CartSummary showPromotion={showPromotion} view="mobile" />
        </div>
      ) : null}

      {isOpenOrderSummary ? (
        <div className="cart__summary-modal">
          <button
            onClick={() => dispatch(setOpenOrderSummaryModal(false))}
            className="btn-reset cart__summary-modal-close-btn"
          >
            <VscChromeClose />
          </button>

          <CartSummary showPromotion={showPromotion} view="desktop" />
        </div>
      ) : null}
    </>
  )
}
