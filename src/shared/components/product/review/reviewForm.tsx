import { productReviewSchema } from "@/core/schema"
import { isObjectHasValue } from "@/helper"
import { ForwaredResetForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { forwardRef, useEffect, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"

interface ReviewFormProps {
  onSubmit: (val: { message: string }) => void
}

export const ReviewForm = forwardRef(function ReviewFormChild(
  { onSubmit }: ReviewFormProps,
  ref: ForwaredResetForm
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productReviewSchema),
    defaultValues: {
      message: "",
    },
  })

  useEffect(() => {
    ;(
      document?.querySelector(".product__review-form .form-item-input") as HTMLInputElement
    )?.focus()
  }, [])

  useImperativeHandle(ref, () => ({
    onReset: reset,
  }))

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form onSubmit={onSubmitHandler} className="product__review-form">
      <div className="product__review-form-wrapper">
        <div className="form-item-inline">
          <textarea
            className={`form-item-input ${errors.message?.message ? "form-item-input-error" : ""}`}
            rows={4}
            id="productReview"
            placeholder="Mời bạn để lại bình luận..."
            {...register("message")}
          />
          {errors?.message?.message ? (
            <p className="form-item-text-error">{errors.message?.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className={`btn-primary btn-save ${isObjectHasValue(errors) ? "btn-disabled" : ""}`}
        >
          Thêm
        </button>
      </div>
    </form>
  )
})
