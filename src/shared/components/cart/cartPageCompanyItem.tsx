import { CartItem, DraftOrderLine } from '@/models'
import {
  addProductItem,
  deleteProductItem,
  setOpenModalConfirm,
  toggleCheckAllProductInCompany,
  toggleCheckProductItem
} from '@/modules'
import Link from 'next/link'
import { useState } from 'react'
import { BiStore } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { notify } from 'reapop'
import { useOrder, usePromotion } from 'shared/hook'
import { CouponItem } from '../common'
import { InputCheckbox } from '../inputs'
import { ModalConfirm } from '../modal'
import { PromotionModal } from '../order'
import { CartPageItem } from './cartPageItem'

interface CartPageCompanyItemProps {
  data: DraftOrderLine
  className?: string
}

export const CartPageCompanyItem = ({ data, className = '' }: CartPageCompanyItemProps) => {
  const [showPromotionModal, setShowPromotionModal] = useState<boolean>()
  const [currentDeleteCartItem, setCurrentDeleteCart] = useState<CartItem>()
  const dispatch = useDispatch()
  const { createOrderDraft } = useOrder()
  const { cancelPromotion } = usePromotion()

  const toggleModal = () => {
    if (!data?.productList?.some((item) => item.is_check === true)) {
      dispatch(notify('Vui lòng chọn sản phẩm trước khi áp dụng khuyến mãi', 'warning'))
      return
    }

    if (data?.orderDraft?.order_id) {
      setShowPromotionModal(true)
    } else {
      createOrderDraft({
        company_ids: [data.company_id],
        showLoading: true,
        handleSuccess: () => {
          setShowPromotionModal(true)
        }
      })
    }
  }

  const mutateCancelPromotion = () => {
    if (!data?.promotion?.description?.id_promotion) return

    cancelPromotion({ sale_order_id: data?.orderDraft?.order_id })
  }

  const handleDeleteItem = () => {
    if (!currentDeleteCartItem?.product_id) return

    dispatch(deleteProductItem(currentDeleteCartItem))
    mutateCancelPromotion()
  }

  const toggleModalDeleteItem = (data: CartItem) => {
    setCurrentDeleteCart(data)
    dispatch(
      setOpenModalConfirm({
        isOpen: true,
        title: 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?'
      })
    )
  }

  const handleCheckItem = (params: CartItem) => {
    dispatch(toggleCheckProductItem(params))
    mutateCancelPromotion()
  }

  const handleUpdateQuantity = (params: CartItem) => {
    dispatch(addProductItem(params))
    mutateCancelPromotion()
  }

  const handleToggleOrderLine = (company_id: number) => {
    dispatch(toggleCheckAllProductInCompany(company_id))
    mutateCancelPromotion()
  }

  if (!data?.productList?.length) return null
  return (
    <>
      <div className={`bg-white ${className}`}>
        <div className='p-[20px] border-b border-solid border-border-color'>
          <div className='flex items-center'>
            <InputCheckbox
              onCheck={() => handleToggleOrderLine(data.company_id || 1)}
              isChecked={data.productList?.every((item) => item.is_check === true)}
            />

            <div className='flex items-center ml-16'>
              <BiStore className='fill-gray-color-3 text-lg mr-8' />
              <Link href={`/company/${data?.[0]?.company_id || 1}}`}>
                <a className='text-16 font-semibold'>{data?.company_name || 'Công Ty Mặc Định'}</a>
              </Link>
            </div>
          </div>
        </div>

        <div className=''>
          {data?.productList?.map((item, index) => (
            <CartPageItem
              key={index}
              isChecked={item.is_check}
              onUpdateQuantity={handleUpdateQuantity}
              onCheck={handleCheckItem}
              onDeleteItem={toggleModalDeleteItem}
              onChangeUom={mutateCancelPromotion}
              onChangeVariant={mutateCancelPromotion}
              productGift={
                data?.promotion?.promotion_line?.length &&
                data?.promotion?.promotion_line?.find(
                  (_item) => _item.is_promotion && _item.id === item.product_id
                )
              }
              data={item}
            />
          ))}
        </div>

        <div className='p-[20px] border-t border-border-color border-solid'>
          <div className='flex items-center flex-wrap'>
            {data?.productList?.length ? (
              <button onClick={toggleModal} className='text-[13px] font-semibold text-primary'>
                Xem khuyến mãi
              </button>
            ) : (
              <p className='text-[13px] font-normal text-gray-color-3'>
                Vui lòng chọn sản phẩm để chọn mã khuyến mãi
              </p>
            )}

            {data?.promotion?.description?.id_promotion ? (
              <div onClick={toggleModal} className='flex items-center flex-wrap cursor-pointer'>
                <div className='ml-16'>
                  <CouponItem data={data.promotion} />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {showPromotionModal ? (
          <div className='promotion__modal-container'>
            <PromotionModal
              company_id={data?.company_id}
              onClose={() => setShowPromotionModal(false)}
            />
          </div>
        ) : null}

        <ModalConfirm onConfirm={handleDeleteItem} />
      </div>
    </>
  )
}
