import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { ProductParams, ProductCombo } from "@/models"
import productApi from "@/services/productApi"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface Props {
    params?: ProductParams
    key: string
    shouldFetch?: boolean
}

interface ProductComboSWR {
    data: ProductCombo[]
    error: any
    isValidating: boolean
    clearSearchResult: Function
    toggleWishlistStatus: (id: number) => void
    isInitialLoading: boolean
}

const useProductCombo = ({ params, key, shouldFetch = true }: Props): ProductComboSWR => {
    const { userInfo } = useSelector((state: RootState) => state.user)
    const { data, error, isValidating, mutate } = useSWR(
        key,
        key === "products_search" || !shouldFetch
            ? null
            : () =>
                productApi
                    .getProductCombo({ ...params, partner_id: userInfo?.id || 0 })
                    .then((res: any) => res?.result),
        {
            revalidateOnFocus: false,
            dedupingInterval: 120000,
        }
    )

    const toggleWishlistStatus = (id: number) => {
        if (isArrayHasValue(data)) {
            mutate(
                [...data].map((item: ProductCombo) =>
                    item.id === id ? { ...item, wishlist: !item.wishlist } : item
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

export { useProductCombo }
