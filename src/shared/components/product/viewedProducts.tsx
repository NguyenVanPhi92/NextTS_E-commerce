import { RootState } from "@/core/store"
import { useSelector } from "react-redux"
import { ProductSlide } from "./productSlide"

export const ViewedProducts = () => {
  const viewedProducts = useSelector((state: RootState) => state.product.viewedProducts)

  if (!viewedProducts || viewedProducts?.length === 0) return null
  return (
    <div className="product__detail-recently product__detail-item">
      <h3 className="product__detail-heading">Sản phẩm đã xem</h3>
      <ProductSlide products={viewedProducts} />
    </div>
  )
}
