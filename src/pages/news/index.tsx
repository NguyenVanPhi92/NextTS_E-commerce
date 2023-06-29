import { Breadcrumb, News } from "@/components"
import { MainLayout } from "@/layout"

const NewsPage = () => {
  return (
    <div className="container">
      <Breadcrumb breadcrumbList={[{ name: "Tin tức", path: "" }]} />
      <News />
    </div>
  )
}

NewsPage.Layout = MainLayout

export default NewsPage
