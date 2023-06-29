import { RootState } from "@/core/store"
import { Product, ProductCombo } from "@/models"
import {
  clearProductCompare,
  deleteProductCompare,
  setOpenModalConfirm,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { HiTrash } from "react-icons/hi"
import { TiArrowShuffle } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import { useCart } from "shared/hook"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { formatMoneyVND, generateProductSlug } from "@/helper"
import { ModalConfirm } from "../../modal"

export const Compare = ({ type }: { type?: "page" | "modal" }) => {
  const dispatch = useDispatch()
  const { addComboToCart, addProductToCart, getCartItemInProductList } = useCart()
  const { productsCompare } = useSelector((state: RootState) => state.compare)

  const handleResetCompareList = () => {
    dispatch(clearProductCompare())
  }

  const handleAddProductToCart = (product: Product) => {
    const productExist = getCartItemInProductList(product.id_product_att)
    if (productExist) {
      addProductToCart(product, productExist.product_qty + 1, [], "buy")
    } else {
      addProductToCart(product, 1, [], "buy")
    }
  }

  const handleAddComboToCart = (combo: ProductCombo) => {
    const comboExist = getCartItemInProductList(combo.id)
    if (comboExist) {
      addComboToCart(combo, comboExist.product_qty + 1, "buy")
    } else {
      addComboToCart(combo, 1, "buy")
    }
  }

  return (
    <div className="compare">
      <ModalConfirm onConfirm={handleResetCompareList} />
      {type === "page" ? (
        <div className="compare__header">
          {productsCompare.length > 0 ? (
            <button
              onClick={() =>
                dispatch(
                  setOpenModalConfirm({
                    isOpen: true,
                    title: "Nếu đồng ý bạn sẽ xóa tất cả sản phẩm trong danh sách so sánh",
                  })
                )
              }
              className="btn-reset btn-primary"
            >
              Xóa tất cả
              <TiArrowShuffle />
            </button>
          ) : null}
        </div>
      ) : null}
      {productsCompare.length === 0 ? (
        <div className="compare__empty">
          <p className="compare__empty-text">Danh sách so sánh của bạn đang trống</p>
          <Link href="/" passHref>
            <a className="btn-primary">Tiếp tục mua sắm</a>
          </Link>
        </div>
      ) : (
        <div className="compare__table">
          <div className="compare__table-header">
            <div className="compare__table-item-img"></div>
            <div className="compare__table-item compare__table-item-name-wrapper">Tên</div>
            <div className="compare__table-item">Danh mục</div>
            <div className="compare__table-item">Giá</div>
            <div className="compare__table-item">Đơn vị</div>
            <div className="compare__table-item"></div>
          </div>
          <div className="compare__table-body">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              navigation
              breakpoints={{
                350: {
                  slidesPerView: 2,
                },
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {productsCompare.map((item) => (
                <SwiperSlide key={(item as Product).id || (item as ProductCombo).id}>
                  <div className="compare__table-item-wrapper">
                    <div className="compare__table-item-img">
                      <button
                        onClick={() => dispatch(deleteProductCompare(item))}
                        className="btn-reset compare__table-item-delete-btn"
                      >
                        <HiTrash />
                      </button>

                      <Link
                        href={
                          item.type === "product"
                            ? generateProductSlug(item.name, item.product_tmpl_id)
                            : `/productCombo/${generateProductSlug(item.name, item.id)}`
                        }
                        passHref
                      >
                        <div
                          onClick={() => dispatch(toggleShowCompareModal(false))}
                          className="image-container"
                        >
                          <Image
                            src={`${API_URL}${item.image_url?.[0] || ""}`}
                            alt=""
                            layout="fill"
                            className="image"
                            placeholder="blur"
                            objectFit="contain"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="compare__table-item compare__table-item-name-wrapper">
                      <Link
                        href={
                          item.type === "product"
                            ? generateProductSlug(item.name, item.product_tmpl_id)
                            : `/productCombo/${generateProductSlug(item.name, item.id)}`
                        }
                        passHref
                      >
                        <a className="compare__table-item-name">
                          {(item as Product)?.name || (item as ProductCombo)?.name}
                        </a>
                      </Link>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-category">
                        {(item as Product).categ_name || (item as ProductCombo)?.type}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-price">{formatMoneyVND(item.price)}</p>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-unit">
                        {(item as Product)?.uom.name || (item as ProductCombo)?.type}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <button
                        className="btn-primary"
                        onClick={() =>
                          item.type === "combo"
                            ? handleAddComboToCart(item)
                            : handleAddProductToCart(item)
                        }
                      >
                        Thêm giỏ hàng
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  )
}
