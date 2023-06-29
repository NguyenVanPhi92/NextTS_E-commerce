import { ogImage, thumbnailImage } from "@/assets"
import {
  BottomNavigation,
  HomeCategory,
  HomeCategoryList,
  HomeCompany,
  HomeHeaderMobile,
  Popup,
  Seo,
} from "@/components"
import { MainBanner, MainContent, ProductSaleContainer, SecondaryBanner } from "@/container"
import { DOMAIN_URL } from "@/helper"
import { MainLayout } from "@/layout"
import { useEffect } from "react"
import { useBanner } from "shared/hook"

const Home = () => {
  const { data: banners, isValidating: isBannerLoading } = useBanner()

  useEffect(() => {
    document?.documentElement?.classList?.add("body-with-chat")

    return () => {
      document?.documentElement?.classList?.remove("body-with-chat")
    }
  }, [])

  return (
    <>
      <Seo
        title="Satavan - Mua online, tiêu dùng tiết kiệm"
        thumbnailUrl={thumbnailImage}
        url={""}
        description="Satavan Shop là mô hình bán lẻ trực tiếp D2C và B2B ( bán sỉ ) trực tiếp online kết hợp với các điểm dịch vụ offline nhằm loại bỏ các chi phí trung gian mang lại lợi thế giá rẻ cho người tiêu dùng"
      />

      <HomeHeaderMobile />

      <section className="home container">
        {isBannerLoading ? (
          <MainBanner
            banners={{
              left: null,
              right: null,
            }}
          />
        ) : banners?.length > 1 ? (
          <MainBanner
            banners={{
              left: (banners as any)?.[0]?.images || null,
              right: (banners as any)?.[1]?.images || null,
            }}
          />
        ) : null}

        {/* saleProduct */}
        <ProductSaleContainer />

        <HomeCategory />

        {isBannerLoading ? <SecondaryBanner banners={null} /> : null}

        {banners?.length > 2 ? <SecondaryBanner banners={(banners as any)?.[2]?.images} /> : null}

        <div className="mb-24 mt-12">
          <HomeCompany />
        </div>

        {/* Content */}
        <div className="mb-24">
          <MainContent />
        </div>

        {/* Category */}
        <HomeCategoryList />
      </section>

      <BottomNavigation />
      <Popup />
    </>
  )
}

Home.Layout = MainLayout

export default Home

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          property: "og:image",
          content: ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: ogImage,
          key: "ogimagealt",
        },
        {
          property: "og:image:width",
          content: "400",
          key: "ogimagewidth",
        },
        {
          property: "og:image:height",
          content: "300",
          key: "ogimageheight",
        },
        {
          property: "og:url",
          content: DOMAIN_URL,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content: ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: "Satavan - Mua online, tiêu dùng tiết kiệm",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content:
            "Satavan Shop là mô hình bán lẻ trực tiếp D2C và B2B ( bán sỉ ) trực tiếp online kết hợp với các điểm dịch vụ offline nhằm loại bỏ các chi phí trung gian mang",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
      ],
    },
  }
}
