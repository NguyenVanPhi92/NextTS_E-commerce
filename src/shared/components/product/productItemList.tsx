import { Product } from "@/models"
import { ProductListLoading } from "../common/loader"
import { ProductItem } from "./productItem"

interface ProductItemListProps {
  product: Product
  isLoading?: boolean
  onAddToCart?: (product: Product) => void
  isAddingToCart?: boolean
}

export const ProductItemList = ({
  product,
  isLoading,
  isAddingToCart,
  onAddToCart,
}: ProductItemListProps) => {
  return (
    <>
      {isLoading ? (
        <ProductListLoading type="large" />
      ) : (
        <div className="product__item-list">
          <ProductItem
            onAddToCart={onAddToCart}
            isAddingToCart={isAddingToCart}
            product={product}
          />
        </div>
      )}
    </>
  )
}
