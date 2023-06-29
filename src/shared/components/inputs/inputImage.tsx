import { convertBase64 } from "@/helper"
import ratingApi from "@/services/ratingApi"
import Image from "next/image"
import React, { ChangeEvent, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { useAttachment } from "shared/hook"

interface InputImageProps {
  productId: number
  onChange?: Function
}

export const InputImage = ({ productId, onChange }: InputImageProps) => {
  const [image, setImage] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files?.length) return

    try {
      setLoading(true)
      const attachment = await convertBase64(files[0])
      if (!attachment) return

      const res: any = await ratingApi.createAttachment({
        product_id: productId,
        attachments: [
          { file: attachment.replace(/^data:image\/\w+;base64,/, ""), type: "picture" },
        ],
      })

      const imageIds: any[] = res?.result?.data
      if (imageIds?.length > 0) {
        // setImage()
        // setAttachmentIds(imageIds.map((item) => item.attachment_id))
        // setRatingImageIds(imageIds.map((item) => item.image_id))
      } else {
        // dispatch(notify("Có lỗi xảy ra, vui lòng chọn lại ảnh", "warning"))
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="rating__form-attachment">
      <label htmlFor="rating-attachment">chon</label>
      <input
        onChange={handleUploadImage}
        hidden
        type="file"
        accept="image/png, image/gif, image/jpeg"
        multiple
        id="rating-attachment"
      />

      <div className="rating__form-attachment-image">
        <div className="rating__form-attachment-image-item">
          {/* {initialValue?.comment_rating?.attachment_ids
              ?.length === 0 ? ( */}

          {/* ) : null} */}

          {/* {ratingImageIdsLoading &&
            !ratingImageIdsLoading?.includes(url) ? (
              <span className="rating__form-attachment-image-item-loading">
                <RiLoader4Fill className="loader" />
              </span>
            ) : null} */}

          {image ? (
            <div className="image-container">
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  // deleteImage(url)
                }}
                className="btn-reset rating__form-attachment-image-item-delete"
              >
                <IoMdClose />
              </span>

              <Image
                width={100}
                height={100}
                src={image}
                alt=""
                layout="fill"
                quality={20}
                className="image"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
