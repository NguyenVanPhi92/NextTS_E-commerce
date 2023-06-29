import { formatMoneyVND, generateProductSlug, isArrayHasValue } from "@/helper"
import { ComboProductItem, ProductComboDetail as IProductComboDetail } from "@/models"
import { addProductCompare } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { FaShoppingBasket } from "react-icons/fa"
import { RiArrowUpDownLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useCart } from "shared/hook"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import ButtonShare from "../common/button/buttonShare"
import { Star } from "../common/star"
import { InputQuantity } from "../inputs"
import ProductImg from "./productImage"

interface ProductComboDetailProps {
  productComboDetail: IProductComboDetail
  type?: "modal" | "detail"
}

export const ProductComboDetail = ({
  productComboDetail,
  type = "detail",
}: ProductComboDetailProps) => {
  const dispatch = useDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { getCartItemInProductList, addComboDetailToCart } = useCart()

  const [quantity, setQuantity] = useState<number>(1)

  const handleAddToCompareList = () => {
    dispatch(addProductCompare(productComboDetail))
    dispatch(notify("Đã thêm vào danh sách so sánh", "success"))
  }

  const handleAddComboToCart = (comboDetail: IProductComboDetail, type: "buy" | "cart") => {
    const comboExist = getCartItemInProductList(comboDetail.id)

    addComboDetailToCart(comboDetail, (comboExist ? comboExist?.product_qty : 0) + quantity, type)

    if (type === "buy") {
      router.push("/cart")
      return
    }
  }

  return (
    <>
      <div className="modal__product-content">
        {isArrayHasValue(productComboDetail.image) ? (
          <ProductImg isStock={false} type={type} images={productComboDetail.image} />
        ) : null}

        <div ref={divRef} className="product__intro">
          <div className="modal__product-header">
            <p className="modal__product-title">{productComboDetail.name}</p>

            <div className="modal__product-sub">
              <p className="modal__product-sub-item modal__product-sub-item-star">
                <Star ratingValue={productComboDetail?.star_rating * 20} size={16} readonly />
              </p>
              <p className="hidden sm:block text-[red] modal__product-sub-item modal__product-sub-item-rating">
                {productComboDetail?.rating_count || 0} đánh giá
              </p>
              <p className="modal__product-sub-item">
                {productComboDetail?.sales_count || 0} Đã bán
              </p>
              <p className="hidden sm:block modal__product-sub-item modal__product-sub-item-comment">
                {productComboDetail?.comment_count || 0} bình luận
              </p>
            </div>
          </div>

          <div className="product__intro-price">
            <div className="product__intro-price-wrapper">
              {productComboDetail.discount > 0 && (
                <p className={`product__intro-price-old`}>
                  {formatMoneyVND(productComboDetail.price)}
                </p>
              )}
              <p className={`product__intro-price-current`}>
                {formatMoneyVND(
                  (productComboDetail.price - productComboDetail.discount) * quantity
                )}
              </p>

              <span className="product__intro-price-unit">
                / {quantity > 1 ? quantity : ""} Combo
              </span>
            </div>
          </div>

          <div className="product__intro-quantity">
            <p>Số lượng</p>
            <InputQuantity quantity={quantity} onChangeQuantity={(q: number) => setQuantity(q)} />
          </div>

          {productComboDetail?.list_products?.length > 0 ? (
            <div>
              <p className="mb-16">Danh sách sản phẩm</p>
              <Swiper
                modules={[Navigation]}
                slidesPerView={5}
                spaceBetween={10}
                slidesPerGroup={4}
                navigation
                loop={false}
                breakpoints={{
                  300: {
                    spaceBetween: 5,
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                  },
                  500: {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    slidesPerGroup: 2,
                  },
                  576: {
                    spaceBetween: 5,
                    slidesPerView: 4,
                    slidesPerGroup: 2,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                  },
                  900: {
                    slidesPerView: 4,
                  },
                  1500: {
                    slidesPerView: 5,
                  },
                }}
              >
                {productComboDetail?.list_products.length > 0 ? (
                  <div>
                    {productComboDetail?.list_products.map((item: ComboProductItem) => (
                      <SwiperSlide key={item.id} className="mb-16">
                        <Link passHref href={generateProductSlug(item.name, item.product_tmpl_id)}>
                          <div
                            key={item.id}
                            className="rounded-md p-4 cursor-pointer shadow-md hover:shadow-lg active:shadow-xl"
                          >
                            <div className="flex flex-col items-center">
                              <div className="relative w-[70px] h-[70px] mb-4">
                                <Image
                                  layout="fill"
                                  objectFit="cover"
                                  src={`${API_URL}${item.image_url[0] || ""}`}
                                  alt={item.name}
                                />
                              </div>
                              <div className="">
                                <p className="line-clamp-1 mb-4 text-xs text-black-60">
                                  {item.name}
                                </p>
                                <p className="text-xs text-error text-end mb-2">
                                  {`x${item.quantity_is} ${item.qty_uom}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </div>
                ) : null}
              </Swiper>
            </div>
          ) : null}

          <div className="product__intro-shop">
            <button
              onClick={() => handleAddComboToCart(productComboDetail, "buy")}
              className="btn-primary product__intro-shop-cart-btn show-on-md"
            >
              <span>Mua ngay</span>
            </button>

            <button
              onClick={() => handleAddComboToCart(productComboDetail, "buy")}
              className="btn-primary product__intro-shop-cart-btn hide-on-md"
            >
              <span>Mua ngay</span>
            </button>

            <button
              onClick={() => handleAddComboToCart(productComboDetail, "cart")}
              className="product__intro-shop-btn"
            >
              <>
                <FaShoppingBasket />
                <span>Thêm giỏ hàng</span>
              </>
            </button>

            <button
              onClick={() => handleAddComboToCart(productComboDetail, "cart")}
              className="product__intro-shop-btn-sm product__intro-shop-cart-mobile"
            >
              <>
                <FaShoppingBasket />
                <span>Thêm giỏ hàng</span>
              </>
            </button>
          </div>

          <div className="product__intro-bottom">
            <div className="product__intro-sub">
              <button onClick={handleAddToCompareList} className="product__intro-sub-item">
                <RiArrowUpDownLine />
              </button>
            </div>

            <div className="product__intro-bottom-separate"></div>
            <ButtonShare
              product_id={productComboDetail.id}
              imageUrl={`${process.env.REACT_APP_API_URL}${productComboDetail.image[0] || ""}`}
              name={productComboDetail.name}
              description={productComboDetail.description_sale}
            />
          </div>
        </div>
      </div>
    </>
  )
}
