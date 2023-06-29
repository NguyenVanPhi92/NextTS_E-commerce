import { formatMoneyVND } from "@/helper"
import { ApplyPromotionRes } from "@/models"

interface CouponItemProps {
  className?: string
  data: ApplyPromotionRes
}

export const CouponItem = ({ data, className = "" }: CouponItemProps) => {
  const RenderValue = () => {
    const discountLine = data?.promotion_line?.[0]

    if (discountLine?.discount_line?.type === "fixed") {
      return <span className="ml-2">{formatMoneyVND(discountLine?.price_unit)}</span>
    }

    if (discountLine?.discount_line?.type === "percentage") {
      return <span className="ml-2">{discountLine?.discount_line?.value}%</span>
    }

    return null
  }

  return (
    <div
      className={`py-4 px-12 rounded-[8px] bg-primary-opacity border border-solid border-primary relative ${className}`}
    >
      <span className="bg-white w-[8px] h-[8px] rounded-[50%] absolute-vertical left-[-3px] border border-solid border-primary border-l-0 border-b-0 rotate-[45deg]"></span>

      <div className="flex items-center text-xs">
        <span className="mr-2">{data.description?.name_promotion}</span>
        <RenderValue />
      </div>

      <span className="bg-white w-[8px] h-[8px] rounded-[50%] absolute-vertical right-[-3px] border border-solid border-primary border-r-0 border-t-0 rotate-[45deg]"></span>
    </div>
  )
}
