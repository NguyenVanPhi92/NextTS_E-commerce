import { ogImage, thumbnailImage, zaloIcon } from "@/assets"
import {
  Breadcrumb,
  HeaderMobile,
  ProductDetail,
  ProductDetailLoading,
  ProductRelated,
  ProductTabs,
  Seo,
  ViewedProducts,
} from "@/components"
import { DOMAIN_URL, fromProductSlugToProductId, isObjectHasValue } from "@/helper"
import { MainLayout } from "@/layout"
import { BreadcrumbItem, Product, ProductDetail as IProductDetail } from "@/models"
import { addViewedProduct, setOpenCartModal } from "@/modules"
import productApi from "@/services/productApi"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiCart } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { useCart, useProductDetail, useWishlist } from "shared/hook"

interface ProductDetailPageProps {
  product: IProductDetail
}

const ProductDetailPage = ({ product: productProps }: ProductDetailPageProps) => {
  const dispatch = useDispatch()
  const { cartLength } = useCart()
  const router = useRouter()
  const productIdParams = router.query?.productId
  const productId = fromProductSlugToProductId(productIdParams as string)
  useWishlist(true)

  const { data: product, isValidating } = useProductDetail({
    type: "detail",
    initialValue: productProps,
  })

  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    document?.documentElement?.classList?.add("body-with-chat")

    return () => {
      document?.documentElement?.classList?.remove("body-with-chat")
    }
  }, [])

  // useEffect(() => {
  //   ;<Script
  //     src="https://sp.zalo.me/plugins/sdk.js"
  //     onLoad={() => {
  //       setTimeout(() => {
  //         const element = document?.querySelector?.(".zalo-share-button-wrapper")
  //         console.log({ element })
  //         if (element) {
  //           element.innerHTML = `
  //             <div
  //             class="zalo-share-button"
  //             data-href={url}
  //             data-oaid="${process.env.NEXT_PUBLIC_ZALO_OAID}"
  //             data-layout="1"
  //             data-color="blue"
  //             data-customize="true"
  //           >
  //             <div className="image-container">
  //               <img src="${zaloIcon}" alt="" />
  //             </div>
  //           </div>
  //           `
  //         }
  //       }, 1000)
  //     }}
  //   />
  // }, [productIdParams])

  // Get category breadcrumb
  useEffect(() => {
    setBreadcrumbList([
      {
        name: product?.categ_name || "",
        path: `/category/${product?.categ_id || 1}`,
      },
      { name: product?.name || "", path: "/" },
    ])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.productId])

  useEffect(() => {
    if (!product?.product_tmpl_id) return
    dispatch(addViewedProduct(product))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  if (router.isFallback || isValidating)
    return (
      <div className="product__detail-loading">
        <div className="container">
          <ProductDetailLoading />
        </div>
      </div>
    )
  if (!product) return null

  return (
    <>
      <Seo
        title={product?.name || ""}
        thumbnailUrl={product?.image_url?.[0] || thumbnailImage}
        url={`/${product?.product_tmpl_id || ""}`}
        description={product?.name || ""}
      />

      <HeaderMobile
        centerChild={<p>{product?.name || ""} </p>}
        showHomeButton={true}
        rightChild={
          <button
            onClick={() => dispatch(setOpenCartModal(true))}
            className="btn-reset header__main-top-actions-icon-mobile"
          >
            <BiCart />
            <span className="cart__quantity-absolute">{cartLength || 0}</span>
          </button>
        }
      />

      <div className="product__detail-container">
        <div className="container">
          {isObjectHasValue(product) ? <Breadcrumb breadcrumbList={breadcrumbList} /> : null}

          <section className="product__detail-wrapper">
            <ProductDetail product={product} />
          </section>

          {isObjectHasValue(product) ? (
            <div className="product__detail-tabs-wrapper">
              <ProductTabs product={product} />
            </div>
          ) : null}

          {product?.category?.id ? (
            <ProductRelated productTmplId={Number(productId)} categoryId={product?.category.id} />
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
  const res: any = await productApi.getProductList({ limit: 1 })

  return {
    paths: res?.result?.data?.products.map((item: Product) => ({
      params: { productId: item.id + "" },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const product_id = fromProductSlugToProductId(context.params?.productId as string)
  const { result } = await productApi.getProductList({
    product_id: product_id,
    limit: 1,
  })

  const newProduct = result?.data?.products[0]

  if (!newProduct.id) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: newProduct,
      openGraphData: [
        {
          property: "og:image",
          content: newProduct?.image_url?.[0] || ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: newProduct?.image_url?.[0] || ogImage,
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
          content: newProduct?.image_url?.[0] || ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: newProduct?.name || "",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content: newProduct?.name || "",
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
