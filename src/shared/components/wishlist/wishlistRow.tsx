/* eslint-disable @next/next/no-img-element */
import { formatMoneyVND, generateProductSlug } from "@/helper"
import { Wishlist } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { FaTimes } from "react-icons/fa"
import { Star } from "../common"

interface WishlistRowProps {
  onDelete?: (_: Wishlist) => void
  data: Wishlist
}

export const WishlistRow = ({ onDelete, data }: WishlistRowProps) => {
  const renderStatus = () => {
    return data.qty_available <= 0 ? (
      <p className="font-bol text-error text-xs w-fit text-xs p-4 px-4 capitalize scale-75 md:scale-100 border border-error rounded-tl-2xl rounded-br-2xl">
        Hết hàng
      </p>
    ) : null
  }

  const renderDeleteBtn = () => {
    return (
      <button
        onClick={() => {
          onDelete && onDelete(data)
        }}
        className="text-lg opacity-20 hover:opacity-50 active:scale-75"
      >
        <FaTimes />
      </button>
    )
  }

  return (
    <div
      className="grid grid-cols-5 md:grid-cols-7 gap-4 md:gap-12 
    relative border-b border-gray-color-1 p-16
    bg-white-color"
    >
      <div className="absolute top-12 left-12 z-10 text-xs">{renderStatus()}</div>

      <div className="relative w-auto h-[80px] md:h-[100px]">
        <Link passHref href={generateProductSlug(data.name, data.product_id)}>
          <Image
            className="cursor-pointer"
            layout="fill"
            src={`${API_URL}${data?.image_url[0] || ""}`}
            alt={data.name}
          />
        </Link>
      </div>

      {/* api do not have rating value */}
      <div className="col-span-4 md:col-span-5">
        <div className="grid grid-cols-10">
          <div className="col-span-9">
            <Link passHref href={generateProductSlug(data.name, data.product_id)}>
              <p className="text-xs md:text-sm font-medium text-black-70 mb-2 line-clamp-2 cursor-pointer hover:text-primary active:opacity-50">
                {data.name || ""}
              </p>
            </Link>

            <p className="block md:hidden text-error font-bold mb-2">
              {formatMoneyVND(data.price)}
            </p>

            <div className="flex gap-4 items-baseline mb-2">
              <Star ratingValue={50} size={16} readonly />
              <span className="text-xs">{`(${data?.comment_count || 0} nhận xét)`}</span>
            </div>
          </div>

          <div className="absolute block md:hidden top-8 right-8">{renderDeleteBtn()}</div>
        </div>
      </div>

      <div className="col hidden md:block">
        <div className="grid grid-cols-4">
          <div className="col-span-3 flex flex-col text-end justify-end">
            <p className="text-error font-bold">{formatMoneyVND(data.price)}</p>
          </div>
          <div className="absolute top-8 right-8">{renderDeleteBtn()}</div>
        </div>
      </div>
    </div>
  )
}
