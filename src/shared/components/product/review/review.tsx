import { StarEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { OnResetParams, ProductReviewForm } from "@/models"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { useSelector } from "react-redux"
import { useReview } from "shared/hook"
import { ModalConfirm } from "../../modal"
import { ReviewForm } from "./reviewForm"
import { ReviewItem } from "./reviewItem"

export const ProductReview = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const reviewFormRef = useRef<OnResetParams>(null)
  const { currentReviewId } = useSelector((state: RootState) => state.common)
  const {
    data: reviews,
    handleAddReview,
    handleDeleteReview,
  } = useReview({
    shouldFetch: true,
    product_id: Number(router.query.productId) || 0,
  })
  const [isOpenReviewForm, setOpenReviewForm] = useState<boolean>((reviews?.length || 0) > 0)

  const handleAdd = ({ message }: ProductReviewForm) => {
    handleAddReview({
      params: {
        content: message,
        product_id: Number(router.query?.productId) || 0,
      },
      onSuccess: () => {
        reviewFormRef.current?.onReset()
      },
    })
  }

  return (
    <div ref={divRef} className="product__review">
      <div className="product__review-form">
        <h3
          className="product__review-form-heading"
          onClick={() => {
            setOpenReviewForm(!isOpenReviewForm)
          }}
        >
          Thêm bình luận
          {isOpenReviewForm ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
        </h3>

        {isOpenReviewForm ? <ReviewForm ref={reviewFormRef} onSubmit={handleAdd} /> : null}
      </div>

      {reviews?.length === 0 ? (
        <div className="rating-no-rating">
          {StarEmptyIcon}
          <p>Chưa có bình luận nào cho sản phẩm này</p>
        </div>
      ) : null}

      {reviews && reviews?.length > 0 ? (
        <ul className="comment__list">
          {reviews.map((comment) => (
            <ReviewItem key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : null}

      <ModalConfirm
        onConfirm={() =>
          handleDeleteReview({
            params: {
              comment_id: currentReviewId,
              product_id: Number(router.query?.productId) || 0,
            },
          })
        }
      />
    </div>
  )
}
