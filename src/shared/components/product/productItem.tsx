import { imageBlur } from "@/assets"
import { ProductItemLoading } from "@/components"
import { formatMoneyVND, generateProductSlug, isArrayHasValue, isObjectHasValue } from "@/helper"
import { Product } from "@/models"
import {
  addProductCompare,
  setOpenModalProduct,
  setProduct,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoExpandOutline } from "react-icons/io5"
import { RiBarChartFill, RiLoader4Fill, RiShoppingBasket2Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { Star } from "../common/star"

interface IProductItem {
  product: Product
  isLoading?: boolean
  onAddToCart?: (product: Product) => void
  isAddingToCart?: boolean
}

export const ProductItem = ({ product, isLoading, onAddToCart, isAddingToCart }: IProductItem) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleAddToCart = () => {
    if (product.attributes?.length > 0) {
      handleOpenModalProduct()
    } else {
      onAddToCart?.(product)
    }
  }

  const handleAddToCompareList = () => {
    dispatch(toggleShowCompareModal(true))
    dispatch(addProductCompare(product))
  }

  const handleOpenModalProduct = () => {
    dispatch(setProduct(product))
    dispatch(setOpenModalProduct(true))
  }

  const imageUrls: Array<string> = isArrayHasValue(product.representative_image)
    ? product.representative_image
    : product.image_url

  return (
    <>
      {!isLoading && isObjectHasValue(product) ? (
        <div className="product__card">
          <div className="product__card__img">
            <div className="product__card__sub">
              {!router.query.productId ? (
                <button onClick={handleOpenModalProduct} className="product__card__sub-item">
                  <IoExpandOutline />
                  <span
                    className="tool-tip"
                    style={{
                      left: `calc(-100% - 46px)`,
                    }}
                  >
                    Xem chi tiết
                  </span>
                </button>
              ) : null}

              {/* <ButtonWishlist type="item" product={product} /> */}

              <button onClick={handleAddToCompareList} className="product__card__sub-item">
                <RiBarChartFill />
                <span
                  className="tool-tip"
                  style={{
                    left: `calc(-100% - 75px)`,
                  }}
                >
                  Thêm vào so sánh
                </span>
              </button>
            </div>

            {imageUrls.length === 1 ? (
              <Link passHref href={generateProductSlug(product.name, product.id)}>
                <div
                  onClick={() => dispatch(setProduct(product))}
                  className="image-container product__card__img-item cursor-pointer"
                >
                  <Image
                    className="image img-cover"
                    src={`${API_URL}${imageUrls?.[0] || ""}`}
                    alt=""
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={imageBlur}
                  />
                </div>
              </Link>
            ) : (
              <>
                <Link passHref href={generateProductSlug(product.name, product.id)}>
                  <div
                    onClick={() => dispatch(setProduct(product))}
                    className="image-container cursor-pointer product__card__img-item product__card__img-top product__card__img-top-first"
                  >
                    <Image
                      className="image"
                      src={`${API_URL}${imageUrls?.[0] || ""}`}
                      alt=""
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={imageBlur}
                    />
                  </div>
                </Link>

                {imageUrls?.[1] ? (
                  <Link passHref href={generateProductSlug(product.name, product.id)}>
                    <div
                      onClick={() => dispatch(setProduct(product))}
                      className="image-container product__card__img-top product__card__img-item product__card__img-top-second cursor-pointer"
                    >
                      <Image
                        className="image"
                        src={`${API_URL}${imageUrls?.[1] || ""}`}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  </Link>
                ) : null}
              </>
            )}

            {onAddToCart ? (
              <button
                onClick={handleAddToCart}
                className={`btn-reset product__card__img-cart-btn ${
                  isAddingToCart ? "product__card__img-cart-btn-disabled" : ""
                }`}
              >
                {isAddingToCart ? <RiLoader4Fill className="loader" /> : <RiShoppingBasket2Line />}
              </button>
            ) : null}
          </div>

          <div className="product__card-body">
            <div className="product__card__content">
              <Link href={generateProductSlug(product.name, product.id)} passHref>
                <a className="product__card__content-title">{product.name}</a>
              </Link>

              <div className="product__card__content-rating">
                <Star readonly size={15} ratingValue={product.star_rating * 20} />
              </div>

              {/* <p className="product__card__content-price">
                <span
                  className={`product__card__content-price ${product?.daily_deal_promotion?.compute_price
                    ? "product__card__content-price-sale"
                    : "product__card__content-price-origin"
                    } `}
                >
                  {formatMoneyVND(product.price)}
                </span>
                {product?.daily_deal_promotion?.compute_price ? (
                  <span className="product__card__content-price product__card__content-price-origin">
                    {formatMoneyVND(getPriceProduct(product))}
                  </span>
                ) : null}
              </p> */}

              <p className="product__card__content-price">
                <span className="product__card__content-price product__card__content-price-origin">
                  {formatMoneyVND(product.price)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ProductItemLoading />
      )}
    </>
  )
}
