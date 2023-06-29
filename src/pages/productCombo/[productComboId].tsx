import { ogImage, thumbnailImage } from "@/assets"
import {
  Breadcrumb,
  HeaderMobile,
  ProductComboDetail,
  ProductDetailLoading,
  ProductTabs,
  Seo,
  ViewedProducts,
} from "@/components"
import { DOMAIN_URL, fromProductSlugToProductId, isObjectHasValue } from "@/helper"
import { MainLayout } from "@/layout"
import { BreadcrumbItem, ProductCombo, ProductComboDetail as IProductComboDetail } from "@/models"
import { setOpenCartModal } from "@/modules"
import productApi from "@/services/productApi"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiCart } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { useProductComboDetail, useWishlist } from "shared/hook"

interface ProductComboDetailPageProps {
  productCombo: IProductComboDetail
}

const ProductDetailPage = ({ productCombo: productComboProps }: ProductComboDetailPageProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  useWishlist(true)

  const { data: productCombo, isValidating } = useProductComboDetail({
    type: "detail",
    initialValue: productComboProps,
  })

  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    document?.documentElement?.classList?.add("body-with-chat")

    return () => {
      document?.documentElement?.classList?.remove("body-with-chat")
    }
  }, [])

  // Get category breadcrumb
  useEffect(() => {
    setBreadcrumbList([{ name: productCombo?.name || "", path: "/" }])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.productComboId])

  if (router.isFallback || isValidating)
    return (
      <div className="product__detail-loading">
        <div className="container">
          <ProductDetailLoading />
        </div>
      </div>
    )

  if (!productCombo) return null
  return (
    <>
      <Seo
        title={productCombo?.name || ""}
        thumbnailUrl={productCombo?.image_url?.[0] || thumbnailImage}
        url={`/${productCombo?.id || ""}`}
        description={productCombo?.name || ""}
      />

      <HeaderMobile
        centerChild={<p>{productCombo?.name || ""} </p>}
        showHomeButton={true}
        rightChild={
          <button
            onClick={() => dispatch(setOpenCartModal(true))}
            className="btn-reset header__main-top-actions-icon-mobile"
          >
            <BiCart />
            <span className="cart__quantity-absolute">{}</span>
          </button>
        }
      />

      <div className="product__detail-container">
        <div className="container">
          {isObjectHasValue(productCombo) ? <Breadcrumb breadcrumbList={breadcrumbList} /> : null}

          <section className="product__detail-wrapper">
            <ProductComboDetail productComboDetail={productCombo} />
          </section>

          {isObjectHasValue(productCombo) ? (
            <div className="product__detail-tabs-wrapper">
              <ProductTabs product={productCombo} />
            </div>
          ) : null}

          <ViewedProducts />
        </div>
      </div>
    </>
  )
}

ProductDetailPage.Layout = MainLayout
export default ProductDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  const res: any = await productApi.getProductCombo({ limit: 1000 })

  return {
    paths: res.result.map((item: ProductCombo) => ({
      params: { productComboId: item.id + "" },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const product_combo_id = fromProductSlugToProductId(context.params?.productComboId as string)

  const { result: productComboDetail }: any = await productApi.getProductComboDetail({
    product_id: product_combo_id,
    type: "combo",
  })

  const productCombo = productComboDetail?.data?.detail

  if (!productCombo?.id)
    return {
      notFound: true,
    }

  return {
    props: {
      productCombo,
      openGraphData: [
        {
          property: "og:image",
          content: productCombo?.image_url?.[0] || ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: productCombo?.image_url?.[0] || ogImage,
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
          content: productCombo?.image_url?.[0] || ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: productCombo?.name || "",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content: productCombo?.name || "",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
      ],
    },
    revalidate: 10,
  }
}
