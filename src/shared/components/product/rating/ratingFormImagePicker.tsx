import Image from "next/image"
import React, { ChangeEvent } from "react"
import { IoMdClose } from "react-icons/io"
import { useAttachment } from "shared/hook"

interface InputImageUploadProps {
  onChange?: (_: any) => void
  productId: number
}

export const RatingFormImagePicker = ({ onChange, productId }: InputImageUploadProps) => {
  const { getBase64Images, images } = useAttachment({ limit: 5 })

  const handleUploadImage = async (val: string) => {
    // try {
    //   getBase64Images(e.target.files, async (urls: Array<string>) => {
    //     setRatingImageIdsLoading(urls)
    //     const res: any = await ratingApi.createAttachment({
    //       product_id: initialValue.product.product_tmpl_id,
    //       attachments: urls.map((url) => ({
    //         file: url.replace(/^data:image\/\w+;base64,/, ""),
    //         type: "picture",
    //       })),
    //     })
    //     setRatingImageIdsLoading(undefined)
    //     const imageIds: AttachmentRes[] = res?.result?.data
    //     if (imageIds?.length > 0) {
    //       setAttachmentIds(imageIds.map((item) => item.attachment_id))
    //       setRatingImageIds(imageIds.map((item) => item.image_id))
    //     } else {
    //       dispatch(notify("Có lỗi xảy ra, vui lòng chọn lại ảnh", "warning"))
    //     }
    //     setRatingImageIdsLoading(undefined)
    //   })
    // } catch (error) {
    //   setRatingImageIdsLoading(undefined)
    // }
  }

  const handleUploadImages = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files?.length) return

    getBase64Images(files, (val) => {
      // uplo
    })
    // HTMLInputElement
  }

  return (
    <div className="rating__form-attachment">
      <input
        onChange={(e) => handleUploadImages(e)}
        hidden
        type="file"
        accept="image/png, image/gif, image/jpeg"
        multiple
        id="rating-attachment"
      />

      <div className="rating__form-attachment-image">
        {images &&
          images?.map((url, index) => (
            <div key={index} className="rating__form-attachment-image-item">
              {/* {initialValue?.comment_rating?.attachment_ids
                  ?.length === 0 ? ( */}
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  // deleteImage(url)
                }}
                className="btn-reset rating__form-attachment-image-item-delete"
              >
                <IoMdClose />
              </span>
              {/* ) : null} */}

              {/* {ratingImageIdsLoading &&
                !ratingImageIdsLoading?.includes(url) ? (
                  <span className="rating__form-attachment-image-item-loading">
                    <RiLoader4Fill className="loader" />
                  </span>
                ) : null} */}

              <div className="image-container">
                <Image
                  width={100}
                  height={100}
                  src={url}
                  alt=""
                  layout="fill"
                  quality={20}
                  className="image"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
