import { ogImage } from "@/assets"
import { Breadcrumb, HeaderMobile, NewsSlide, Seo, Spinner } from "@/components"
import { DOMAIN_URL, isObjectID } from "@/helper"
import { MainLayout } from "@/layout"
import { OpenGraphData, PostDetailRes, PostRes } from "@/models"
import newsApi from "@/services/newsApi"
import { GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"

interface PostDetailProps {
  fallback: {
    "/post/detail": PostDetailRes
  } | null
}

const PostDetail = ({ fallback }: PostDetailProps) => {
  const router = useRouter()
  const { postId } = router.query

  const { data } = useSWR<PostDetailRes>(
    postId ? "/post/detail" : null,
    () => newsApi.getPostDetail(postId + "").then((res: any) => res.data),
    {
      dedupingInterval: 1000,
      fallbackData: fallback?.["/post/detail"] || undefined,
    }
  )

  const { data: newsRelated, isValidating: isRelatedLoading } = useSWR<PostRes[]>(
    data?.category?.categoryId ? `get_related_post_${postId}` : null,
    () => newsApi.getPosts({ categoryId: data?.category?.categoryId }).then((res: any) => res.data),
    { dedupingInterval: 1000000 }
  )

  if (router.isFallback)
    return (
      <div className="py-40">
        <Spinner />
      </div>
    )
  return (
    <>
      <HeaderMobile centerChild={<p>{data?.title || "Tin tức"}</p>} />
      <section className="pb-24">
        <div className="container">
          <Seo
            description=""
            thumbnailUrl=""
            title={data?.title || "Tin tức"}
            url={`/news/${data?.postId}`}
          />
          <Breadcrumb
            breadcrumbList={[
              { name: "Tin tức", path: "/news" },
              { name: data?.title || "", path: "" },
            ]}
          />

          {!data?.postId ? (
            <div className="flex-center">
              <p className="text-base text-gray-color-3">Không tìm thấy bài viết này</p>
            </div>
          ) : (
            <div
              className="news__page"
              dangerouslySetInnerHTML={{ __html: data?.content + "" }}
            ></div>
          )}

          {newsRelated?.length ? (
            <div className="mt-24 lg:mt-40">
              <p className="mb-24 text-18 md:text-20 lg:text-24 font-medium">
                Các bài viết liên quan
              </p>
              <NewsSlide isLoading={isRelatedLoading} data={newsRelated} />
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

PostDetail.Layout = MainLayout
export default PostDetail

export async function getStaticPaths() {
  const data = await newsApi.getPosts({ limit: 1000 })

  return {
    paths: (data?.data || [])?.map((item: PostRes) => ({ params: { postId: item?.postId } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const postId = isObjectID((context?.params?.postId || "").toString())
    ? context?.params?.postId
    : ""

  let data: PostDetailRes | null = null
  try {
    data = !postId ? null : (await newsApi.getPostDetail(postId as string))?.data || null
  } catch (error) {
    data = null
  }

  if (!data)
    return {
      props: {
        fallback: {
          "/post/detail": null,
        },
        openGraphData: [],
      },
    }

  return {
    props: {
      fallback: {
        "/post/detail": data,
      },
      openGraphData: [
        {
          property: "og:image",
          content: data?.thumbnail || ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: data?.thumbnail || ogImage,
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
          content: `${DOMAIN_URL}/news/${postId}`,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content: data?.thumbnail || ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: data?.title || "",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content: data?.title || "",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
      ] as OpenGraphData[],
    },
  }
}
