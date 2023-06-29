import { CartPageItemCoupon } from "@/components/cart"
import { formatMoneyVND, toImageUrl } from "@/helper"
import { CartItem, DraftOrderLine } from "@/models"
import Image from "next/image"
import { useState } from "react"
import { BiStoreAlt } from "react-icons/bi"
import { DeliveryOrder } from "../delivery"
import { PromotionModal } from "../promotion"

interface OrderItemProps {
  data: DraftOrderLine
}

export const OrderItem = ({ data }: OrderItemProps) => {
  const [showPromotion, setShowPromotion] = useState<boolean>(false)

  const RenderProductLine = ({ product }: { product: CartItem }) => {
    if (!data?.promotion?.promotion_line?.length) return null

    const productGift = data?.promotion?.promotion_line?.find(
      (_item) => _item.is_promotion && _item.id === product.product_id
    )

    if (!productGift?.id) return null

    return (
      <div className="mt-2 ml-40">
        <CartPageItemCoupon data={productGift} />
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center mb-12">
        <BiStoreAlt className="mr-8 text-base text-gray-color-4" />
        <p className="text-base">{data?.company_name || "Công ty mặc định"}</p>
      </div>

      <div className="mb-24">
        {data?.productList?.length
          ? data.productList?.map((item) => (
              <div className="mb-16 last:mb-0" key={item.product_id}>
                <div className="">
                  <div className="flex ">
                    <div className="relative w-[56px] h-[56px] mr-12">
                      <Image
                        src={toImageUrl(item?.image_url?.[0])}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-13 text-gray-color-4 line-clamp-1">
                        {item.product_name}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-gray-color-4">SL: {item.product_qty}</p>
                        <p className="text-sm text-gray-color-4 font-semibold">
                          {formatMoneyVND(item.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <RenderProductLine product={item} />
                </div>

                {/* {promotionLineLine?.find(_item => _item?.)} */}
              </div>
            ))
          : null}

        {/* {data?.productList?.map((item) => (
					<div className="mb-16 last:mb-0" key={item.product_id}>
						<div className="flex ">
							<div className="relative w-[56px] h-[56px] mr-12">
								<Image
									src={toImageUrl(item?.image_url?.[0])}
									alt=""
									layout="fill"
									objectFit="cover"
								/>
							</div>

							<div className="flex-1">
								<p className="text-xs text-13 text-gray-color-4 line-clamp-1">
									{item.product_name}
								</p>

								<div className="mt-4 flex items-center justify-between">
									<p className="text-xs text-gray-color-4">SL: {item.product_qty}</p>
									<p className="text-sm text-gray-color-4 font-semibold">
										{formatMoneyVND(item.price)}
									</p>
								</div>
							</div>
						</div>
					</div>
				))} */}
      </div>

      <div className="mb-12 md:mb-24">
        <button onClick={() => setShowPromotion(true)} className="text-sm text-primary">
          Chọn voucher
        </button>
      </div>

      <div className="">
        <div className="">
          <DeliveryOrder order_id={data?.orderDraft?.order_id} company_id={data?.company_id} />
        </div>
      </div>

      {showPromotion ? (
        <div className="promotion__modal-container">
          <PromotionModal company_id={data?.company_id} onClose={() => setShowPromotion(false)} />
        </div>
      ) : null}
    </>
  )
}
