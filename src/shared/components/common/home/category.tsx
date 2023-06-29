import { CategoryItem } from "@/components/category"
import React from "react"
import { useCategory } from "shared/hook"

export const HomeCategoryList = () => {
  const { data: categories } = useCategory(true)

  return (
    <div className="home__category">
      <ul className="home__category-list grid grid-col-2 grid-col-sm-3 grid-col-md-4 grid-col-lg-6 grid-col-xl-8">
        {categories.map((cate) => cate.icon && <CategoryItem key={cate.id} category={cate} />)}
      </ul>
    </div>
  )
}
