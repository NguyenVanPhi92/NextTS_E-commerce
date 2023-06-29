import { companyIcon, PromotionItemIcon } from "@/assets"
import { Promotion } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import { AiOutlineInfoCircle } from "react-icons/ai"

interface PromotionItemProps {
  promotion: Promotion
  isActive?: boolean
  onApply?: (promotion: Promotion) => void
  onCancel?: (promotion: Promotion) => void
}

export const PromotionItem = ({ promotion, isActive, onApply, onCancel }: PromotionItemProps) => {
  return (
    <li
      key={promotion.promotion_id}
      className={`flex relative bg-white rounded-xl shadow-shadow-4 p-12 items-stretch ${
        isActive ? "border border-solid border-primary bg-bg-primary" : ""
      }`}
    >
      <div className="promotion__item-image">
        <div className="relative w-[100px] h-[100px]">
          <Image
            src={
              promotion?.promotion_image_url?.image_url
                ? `${API_URL}${promotion?.promotion_image_url.image_url}`
                : companyIcon
            }
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="w-1 bg-gray-color-4 h-[90px] mx-12" />

      {/* main info */}
      <div className="w-full p-4 flex">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-start justify-between">
            <p className="text-xs md:text-sm mb-4 line-clamp-2">{promotion.promotion_name}</p>

            <div className="group relative ">
              <AiOutlineInfoCircle className="text-primary cursor-pointer" />

              <div className="hidden group-hover:block absolute top-8 right-8 w-[400px] bg-white rounded-xl shadow-xl p-24 z-50">
                <div className="flex items-center text-sm mb-4">
                  <p className="text-xs w-[100px]">Mã:</p>
                  <p className="flex-1 break-all text-sm">{promotion.promotion_code}</p>
                </div>

                <div className="flex items-center flex-wrap text-sm mb-4">
                  <p className="text-xs w-[100px]">Thời gian:</p>
                  <p className="flex-1 break-all text-sm">{`${promotion.date_start} - ${promotion.date_end}`}</p>
                </div>

                <div className="flex items-center flex-wrap text-sm">
                  <p className="text-xs w-[100px]">Điều kiện:</p>
                  <p className="flex-1 break-all text-sm">{promotion.promotion_name}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs mb-4">Giới hạn: {0}</p>

          <div className="flex items-end justify-between">
            <p className="text-xs flex">HSD: {promotion.date_end}</p>

            {onApply || onCancel ? (
              <div className="relative">
                <button
                  onClick={() => (!isActive ? onApply?.(promotion) : onCancel?.(promotion))}
                  className="text-white text-xs bottom-0 bg-primary rounded-md px-8 py-6 font-bold"
                >
                  {!isActive ? "Áp dụng" : "Bỏ chọn"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  )
}
