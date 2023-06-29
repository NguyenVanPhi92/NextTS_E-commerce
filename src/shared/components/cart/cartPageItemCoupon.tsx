import { companyIcon } from "@/assets"
import { formatMoneyVND, toImageUrl } from "@/helper"
import { PromotionLine } from "@/models"
import Image from "next/image"

interface ICartPageItemCoupon {
  data: PromotionLine
}

export const CartPageItemCoupon = ({ data }: ICartPageItemCoupon) => {
  return (
    <div className="flex items-center">
      <div className="mr-12">
        <span className="text-xs font-normal z-10 text-error">Hàng tặng</span>
      </div>

      <div className="relative w-[56px] h-[56px] mr-12">
        <Image
          src={toImageUrl(data?.image || companyIcon)}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex-1">
        <p className="text-xs text-13 text-gray-color-4 line-clamp-1">{data.name}</p>

        <div className="mt-4 flex items-center">
          <p className="text-xs text-primary mr-8">SL: {data?.qty} x </p>
          <p className="text-xs text-primary">{formatMoneyVND(data.price_unit)}</p>
        </div>
      </div>
    </div>
  )
}
