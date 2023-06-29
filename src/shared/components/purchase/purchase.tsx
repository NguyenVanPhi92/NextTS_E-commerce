/* eslint-disable @next/next/no-img-element */
import { Modal, Pagination, PurchaseItem, RatingForm3, Spinner } from '@/components'
import { PurchasedProduct, UpdateRatingProps } from '@/models'
import { useRef, useState } from 'react'
import { CgSmileNone } from 'react-icons/cg'
import { useProductRating } from 'shared/hook'

const LIMIT = 12

export const Purchase = () => {
  // const router = useRouter()
  // const { addToCart } = useCartOrder()
  const purchaseListRef = useRef<HTMLDivElement>(null)
  const {
    data: rating,
    isValidating,
    updateCommentRating,
    deleteCommentRating,
    changePage
  } = useProductRating({ shouldFetch: true, type: 'purchase', limit: LIMIT })

  const [purchase, setPurchase] = useState<PurchasedProduct | undefined>()
  const [offset, setOffset] = useState<number>(0)

  const handleChangePage = (_offset: number) => {
    changePage({
      params: { offset: _offset, hasFilter: false },
      cb: () => {
        purchaseListRef.current?.scrollIntoView({ behavior: 'smooth' })
        setOffset(_offset)
      }
    })
  }

  const handleUpdateCommentRating = (params: UpdateRatingProps) => {
    if (!purchase) return
    updateCommentRating(
      {
        ...params,
        history_line_id: purchase.history_line_id
      },
      () => {
        setPurchase(undefined)
      }
    )
  }

  const handleRebuyProducts = async (params: PurchasedProduct) => {
    const { product } = params

    // addToCart(
    //   {
    //     product_id: product.product_id,
    //     product_qty: product.qty_product,
    //     uom_id: product?.uom?.id,
    //     offer_pricelist: false,
    //   },
    //   false,
    //   () => {
    //     router.push("/cart")
    //   }
    // )
  }

  if (isValidating)
    return (
      <div className='py-[40px]'>
        <Spinner />
      </div>
    )

  if ((rating?.data?.length || 0) === 0)
    return (
      <div className='list--empty'>
        <CgSmileNone />
        <p>Bạn chưa hoàn thành đơn hàng nào </p>
      </div>
    )

  return (
    <>
      <div ref={purchaseListRef} className=''></div>

      <div className='purchase__list'>
        {(rating.data as any).map((item: PurchasedProduct) => (
          <PurchaseItem
            key={item.history_line_id}
            data={item}
            onChange={() => setPurchase(item)}
            onRebuy={handleRebuyProducts}
          />
        ))}
      </div>

      {(rating?.data_count || 0) > LIMIT ? (
        <div className='product__rating-pagination'>
          <Pagination
            totalPage={Math.ceil(rating?.data_count / LIMIT)}
            currentOffset={offset}
            onPaginate={(_offset: number) => handleChangePage(_offset)}
          />
        </div>
      ) : null}

      <div className='purchase__modal'>
        {purchase?.history_line_id ? (
          <Modal
            isShowModal={!!purchase?.history_line_id}
            direction='center'
            disableOverLay={true}
            handleClickModal={() => setPurchase(undefined)}
            heading={
              purchase?.comment_rating?.editable
                ? 'Chỉnh sửa đánh giá sản phẩm'
                : 'Đánh giá sản phẩm'
            }
          >
            <div className='rating__form-wrapper'>
              <RatingForm3
                onCloseModal={() => setPurchase(undefined)}
                onAddRating={handleUpdateCommentRating}
                purchaseForm={purchase}
                onDeleteRating={(deleteForm) =>
                  deleteCommentRating(deleteForm, () => {
                    setPurchase(undefined)
                  })
                }
              />
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  )
}
