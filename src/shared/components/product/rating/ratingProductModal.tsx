import { Modal } from "@/components/modal"
import { toImageUrl } from "@/helper"
import { PurchasedProduct } from "@/models"
import { setOpenModalConfirm } from "@/modules"
import Image from "next/image"
import React from "react"
import { useDispatch } from "react-redux"
import { RatingForm } from "./ratingForm2"

interface RatingProductModalProps {
  data: PurchasedProduct
  onClose?: Function
}

export const RatingProductModal = ({ data, onClose }: RatingProductModalProps) => {
  const dispatch = useDispatch()
  const handleUpdateRating = () => {}

  const handleDeleteRating = () => {
    onClose?.()
  }

  const handleAddRating = () => {
    onClose?.()
  }

  return (
    <div className="purchase__modal">
      {data?.history_line_id ? (
        <Modal
          isShowModal={!!data?.history_line_id}
          direction="center"
          disableOverLay={true}
          handleClickModal={() => onClose?.()}
          heading={
            data?.comment_rating?.editable ? "Chỉnh sửa đánh giá sản phẩm" : "Đánh giá sản phẩm"
          }
        >
          <div className="rating__form-wrapper">
            <header className="rating__form-header">
              <div className="rating__form-header-img w-[100px] h-[100px] relative">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={toImageUrl(data?.product?.image_url?.[0] || "")}
                  alt=""
                />
              </div>
              <div className="rating__form-header-info">
                <p className="rating__form-header-info-name">{data?.product?.product_name || ""}</p>
                <p className="rating__form-header-info-variant"></p>
              </div>
            </header>

            <RatingForm
              onAddRating={handleUpdateRating}
              initialValue={data}
              onDeleteRating={handleDeleteRating}
              showFooter
            />
          </div>
        </Modal>
      ) : null}

      {/* <footer className="rating__form-footer">
        <button
          className="btn-primary"
          onClick={() => {
            // handleClearRatingForm()
            // onCloseModal && onCloseModal()
          }}
        >
          Trở lại
        </button>

        {data?.comment_rating?.comment_id ? (
          <button
            onClick={() =>
              dispatch(
                setOpenModalConfirm({
                  isOpen: true,
                  title: "Nếu đồng ý, bạn sẽ xóa đi đánh giá này",
                })
              )
            }
            className="btn-primary rating__form-footer-danger-btn"
          >
            Xóa đánh giá
          </button>
        ) : null}

        <button
          className={`btn-primary ${!ratingVal || !inputProps.value ? "btn-disabled" : ""}`}
          onClick={handleAddRating}
        >
          Hoàn thành
        </button>
      </footer> */}
    </div>
  )
}
