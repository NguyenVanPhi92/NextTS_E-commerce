import { shopBannerImg } from "@/assets"
import { CompanyDetail } from "@/models"
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2"
import { Star } from "../common"
import { Avatar } from "../common/avatar"

interface ShopDetailHeaderProps {
  data: CompanyDetail
}

export const ShopDetailHeader = ({ data }: ShopDetailHeaderProps) => {
  return (
    <div className="relative h-[146px]">
      <div
        style={{ backgroundImage: `url('${shopBannerImg}')` }}
        className="absolute inset-0 bg-cover"
      ></div>

      <div className="z-10 relative h-full bg-black-40 p-24">
        <div className="flex items-center">
          <div className="relative mr-12">
            <Avatar
              url={`data:image/png;base64, ${data?.logo}`}
              className="bg-white"
              size={80}
              objectFit="contain"
            />
          </div>
          <div className="mr-24">
            <div className="mb-4">
              <p className="text-base text-white">{data?.name || "Công ty Mặc Định"}</p>
            </div>

            <div className="flex items-center">
              <p className="text-sm text-white opacity-80">50 sản phẩm</p>
              <span className="h-8 border-r border-border-color-1 border-solid mx-8"></span>
              <p className="text-sm text-white opacity-80">10 đánh giá</p>
            </div>

            <div className="flex items-center">
              <Star ratingValue={100} allowHalfIcon readonly allowHover={false} />
            </div>
          </div>

          <div className="">
            <button className="btn-primary items-center">
              <HiOutlineChatBubbleBottomCenterText className="mr-8" />
              Chat
            </button>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  )
}
