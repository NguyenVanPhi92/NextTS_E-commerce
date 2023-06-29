import { RootState } from "@/core/store"
import { Product } from "@/models"
import productApi from "@/services/productApi"
import { useState } from "react"
import { useSelector } from "react-redux"
import useSWR from "swr"

export const useSearchProduct = (): {
  data: Product[] | undefined
  isValidating: boolean
  isFirstLoading: boolean
  isSearching: boolean
  searchProducts: (_: string) => void
} => {
  const partner_id = useSelector((state: RootState) => state.user.userInfo?.id || 0)
  const [isSearching, setSearching] = useState<boolean>(false)
  const { mutate, data, error, isValidating } = useSWR("get_search_product", () =>
    productApi.getProductList({ partner_id }).then((res) => res?.result?.data?.products || [])
  )

  const searchProducts = async (value: string) => {
    try {
      setSearching(true)
      const data: any = await productApi.getProductList({
        keyword: value,
        partner_id,
      })
      setSearching(false)
      mutate(data?.result || [], false)
    } catch (error) {
      setSearching(false)
    }
  }

  return {
    data,
    isFirstLoading: error === undefined && data === undefined,
    isSearching,
    isValidating,
    searchProducts,
  }
}
