import { imageBlur } from "@/assets"
import { ProductItemLoading } from "@/components"
import { formatMoneyVND, isArrayHasValue, isObjectHasValue, generateProductSlug } from "@/helper"
import { ProductCombo } from "@/models"
import {
  addProductCompare,
  setOpenModalProductCombo,
  setProductCombo,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoExpandOutline } from "react-icons/io5"
import { RiBarChartFill, RiLoader4Fill, RiShoppingBasket2Line } from "react-icons/ri"
import { useDispatch } from "react-redux"

interface IProductComboItem {
  productCombo: ProductCombo
  isLoading?: boolean
  onAddToCart?: (productCombo: ProductCombo) => void
  isAddingToCart?: boolean
}

export const ProductComboItem = ({
  productCombo,
  isLoading,
  onAddToCart,
  isAddingToCart,
}: IProductComboItem) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleAddToCart = () => {
    if (productCombo?.attributes?.length > 0) {
      handleOpenModalProduct()
    } else {
      onAddToCart?.(productCombo)
    }
  }

  const handleAddToCompareList = () => {
    dispatch(toggleShowCompareModal(true))
    dispatch(addProductCompare(productCombo))
  }

  const handleOpenModalProduct = () => {
    dispatch(setProductCombo(productCombo))
    dispatch(setOpenModalProductCombo(true))
  }

  const imageUrls: Array<string> = isArrayHasValue(productCombo.image_url)
    ? productCombo.image_url
    : []

  return (
    <>
      {!isLoading && isObjectHasValue(productCombo) ? (
        <div className="product__card">
          <div className="product__card__img">
            {/* Show on hover: wishlist, compare, detail  */}
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
              <Link
                passHref
                href={`/productCombo/${generateProductSlug(productCombo.name, productCombo.id)}`}
              >
                <div
                  onClick={() => {}}
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
                <Link
                  passHref
                  href={`/productCombo/${generateProductSlug(productCombo.name, productCombo.id)}`}
                >
                  <div className="image-container cursor-pointer product__card__img-item product__card__img-top product__card__img-top-first">
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
                  <Link
                    passHref
                    href={`/productCombo/${generateProductSlug(
                      productCombo.name,
                      productCombo.id
                    )}`}
                  >
                    <div className="image-container product__card__img-top product__card__img-item product__card__img-top-second cursor-pointer">
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
            {onAddToCart && productCombo.type === "combo" ? (
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
              <Link
                href={`/productCombo/${generateProductSlug(productCombo.name, productCombo.id)}`}
                passHref
              >
                <a className="product__card__content-title">{productCombo.name}</a>
              </Link>

              <p className="product__card__content-price">
                {productCombo?.discount > 0 && (
                  <span className={`product__card__content-price-sale`}>
                    {formatMoneyVND(productCombo.price)}
                  </span>
                )}
                <span className={`product__card__content-price-origin`}>
                  {formatMoneyVND(productCombo?.price)}
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
