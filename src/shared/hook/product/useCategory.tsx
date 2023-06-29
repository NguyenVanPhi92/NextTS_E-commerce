import { isArrayHasValue, translateDataToTree } from "@/helper"
import { Category } from "@/models"
import productApi from "@/services/productApi"
import { useState } from "react"
import useSWR from "swr"

interface CategorySWR {
  data: Category[]
  error: any
  isValidating: boolean
  bannerUrls: Array<string>
  getChildCategories: (parent_id: number) => void
  childCategories: Category[]
  isChildCategoryFetching: boolean
  setChildCategories: Function
}

const useCategory = (shouldFetch: boolean, categoryId: number = 0): CategorySWR => {
  const [childCategories, setChildCategories] = useState<Category[]>([])
  const [isChildCategoryFetching, setChildCategoryLoading] = useState<boolean>(false)

  const { data, error, isValidating } = useSWR(
    "category",
    shouldFetch
      ? () => productApi.getCategories(categoryId).then((res: any) => res?.result?.data || [])
      : null,
    { revalidateOnFocus: false, dedupingInterval: 12000 }
  )

  const getBannerUrls = (): Array<string> => {
    if (!isArrayHasValue(data)) return []

    let banners: Array<string> = []
    data.forEach((f: Category) => {
      if (f.image?.length > 0) {
        banners.push(...f.image)
      }
    })

    return banners
  }

  const getChildCategories = async (parent_id: number) => {
    try {
      setChildCategoryLoading(true)
      const res: any = await productApi.getCategories(parent_id)
      setChildCategoryLoading(false)
      setChildCategories(res?.result?.data || [])
    } catch (error) {
      setChildCategoryLoading(false)
    }
  }

  return {
    bannerUrls: getBannerUrls(),
    data: translateDataToTree(data),
    error,
    isValidating,
    getChildCategories,
    childCategories,
    isChildCategoryFetching,
    setChildCategories,
  }
}

export { useCategory }
