import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { Product, ProductParams } from "@/models"
import productApi from "@/services/productApi"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface Props {
  params?: ProductParams
  key: string
  shouldFetch?: boolean
}

interface ProductSWR {
  data: Product[]
  error: any
  isValidating: boolean
  clearSearchResult: Function
  toggleWishlistStatus: (id: number) => void
  isInitialLoading: boolean
}

const useProduct = ({ params, key, shouldFetch = true }: Props): ProductSWR => {
  const { userInfo } = useSelector((state: RootState) => state.user)
  const { data, error, isValidating, mutate } = useSWR(
    key,
    key === "products_search" || !shouldFetch
      ? null
      : () =>
        productApi
          .getProductList({ ...params, partner_id: userInfo?.id || 0 })
          .then((res: any) => res?.result?.data?.products),
    {
      revalidateOnFocus: false,
      dedupingInterval: 120000,
    }
  )

  const toggleWishlistStatus = (product_id: number) => {
    if (isArrayHasValue(data)) {
      mutate(
        [...data].map((item: Product) =>
          item.id_product_att === product_id ? { ...item, wishlist: !item.wishlist } : item
        ),
        false
      )
    }
  }

  const clearSearchResult = () => {
    mutate([], false)
  }

  return {
    data,
    error,
    isValidating,
    clearSearchResult,
    toggleWishlistStatus,
    isInitialLoading: error === undefined && data === undefined,
  }
}

export { useProduct }
