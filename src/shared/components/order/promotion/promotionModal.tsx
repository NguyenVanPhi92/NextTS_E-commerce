import { cartEmptyIcon } from "@/assets"
import { Modal } from "@/components"
import { RootState } from "@/core/store"
import { Promotion } from "@/models"
import { selectOrderLineByCompany } from "@/modules"
import { RiLoader4Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useInputText, usePromotion } from "shared/hook"
import { PromotionItem } from "./promotionItem"

interface PromotionModalProps {
  company_id: number
  onClose?: Function
}

export const PromotionModal = ({ company_id = 1, onClose }: PromotionModalProps) => {
  const { onChange, value: coupon_code } = useInputText()
  const orderLine = useSelector((rootState: RootState) =>
    selectOrderLineByCompany(rootState, company_id)
  )

  const {
    data: promotionList,
    isValidating,
    applyPromotion,
    cancelPromotion,
  } = usePromotion({ company_id })

  const handleApplyPromotion = (promotion: Promotion) => {
    if (!orderLine?.company_id || !orderLine?.orderDraft?.order_id) return

    applyPromotion({
      sale_order_id: orderLine?.orderDraft?.order_id,
      company_id,
      coupon_code: promotion.promotion_code,
      promotion_id: promotion.promotion_id,
    })
  }

  const handleCancelPromotion = () => {
    if (!orderLine?.orderDraft?.order_id) return

    cancelPromotion({ sale_order_id: orderLine?.orderDraft?.order_id })
  }

  return (
    <Modal
      isShowModal
      disableOverLay
      direction="center"
      heading={"Chọn Voucher"}
      handleClickModal={() => onClose?.()}
    >
      <div className="promotion__modal">
        <div className="promotion__modal-header">
          <input
            onChange={onChange}
            className="promotion__modal-header-search"
            value={coupon_code}
            placeholder={"Nhập mã giảm giá"}
            type="text"
          />
          <button
            // onClick={() => coupon_code && handleTogglePromotion({promotion_id: 1, promotioncoupon_code})}
            className={`btn-primary ${coupon_code ? "" : "btn-disabled"}`}
          >
            Áp dụng
          </button>
        </div>

        <div className="promotion__modal-body">
          {isValidating ? (
            <div className="promotion__modal-body-loading">
              <RiLoader4Line className="loader" />
            </div>
          ) : promotionList?.length === 0 ? (
            <div className="promotion__modal-body-empty">
              {cartEmptyIcon}
              <span className="promotion__modal-body-empty-text">
                Không có mã giảm giá nào được tìm thấy
              </span>
            </div>
          ) : (
            <ul className="promotion__modal-list">
              {promotionList?.map(
                (promo) =>
                  promo.promotion_id && (
                    <PromotionItem
                      promotion={promo}
                      key={promo.promotion_id}
                      onApply={handleApplyPromotion}
                      onCancel={handleCancelPromotion}
                      isActive={
                        orderLine?.promotion?.description?.id_promotion === promo.promotion_id
                      }
                    />
                  )
              )}
            </ul>
          )}
        </div>

        <footer className="promotion__modal-footer">
          <button onClick={() => onClose?.()} className="btn-primary flex-1">
            Xong
          </button>
        </footer>
      </div>
    </Modal>
  )
}
