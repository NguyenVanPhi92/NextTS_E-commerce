import { RootState } from "@/core/store"
import { AddComment, AsyncHandler, Comment, DeleteComment, ProductDetail } from "@/models"
import { setOpenScreenLoading } from "@/modules"
import userApi from "@/services/userApi"
import produce from "immer"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR, { useSWRConfig } from "swr"

interface Props {
  product_id: number
  shouldFetch: boolean
}

interface ReviewSWR {
  data: Comment[] | undefined
  error: any
  isValidating: boolean
  handleAddReview: (props: AsyncHandler<AddComment, Comment>) => void
  handleDeleteReview: (props: AsyncHandler<DeleteComment, any>) => void
  clearComments: Function
}

const useReview = ({ product_id, shouldFetch }: Props): ReviewSWR => {
  const dispatch = useDispatch()
  const router = useRouter()
  const token = useSelector((state: RootState) => state.user.token)
  const { mutate: mutateProduct, cache } = useSWRConfig()

  const { data, error, isValidating, mutate } = useSWR<Comment[] | undefined>(
    `review_product_${product_id}`,
    product_id && shouldFetch
      ? () => userApi.getReviews({ product_id }).then((res: any) => res?.result || [])
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const mutateProductDetail = (type: "add" | "delete") => {
    if (!product_id) return
    const key = `get_product_detail_${product_id}`
    const productDetail: ProductDetail | null = cache.get(key)
    if (productDetail?.id_product_att) {
      mutateProduct(
        key,
        {
          ...productDetail,
          comment_count: productDetail.comment_count + (type === "add" ? 1 : -1),
        } as ProductDetail,
        false
      )
    } else {
      mutateProduct(key)
    }
  }

  const handleAddReview = async ({
    params,
    onError,
    onSuccess,
  }: AsyncHandler<AddComment, Comment>) => {
    if (!token) {
      router.push("/login")
    }

    try {
      dispatch(setOpenScreenLoading(true))
      const res: any = await userApi.addReview({ ...params })
      dispatch(setOpenScreenLoading(false))

      if (res?.result?.id) {
        mutate(
          produce(data, (draft) => {
            ;(draft || []).push(res?.result)
          }),
          false
        )

        mutateProductDetail("add")

        onSuccess?.(res.result)
      } else {
        dispatch(notify(res?.result?.message, "error"))
      }
    } catch (error) {
      dispatch(notify("Có lỗi xảy ra, vui lòng thử lại sau", "error"))
      dispatch(setOpenScreenLoading(false))
    }

    // asyncHandler<AddComment, Comment>({
    //   fetcher: userApi.addReview({ ...params, token }),
    //   onSuccess(res) {
    //     if (!data) return
    //     mutate(
    //       produce(data, (draft) => {
    //         ;(draft || []).push(res)
    //       }),
    //       false
    //     )
    //     onSuccess?.(res)
    //   },
    //   onError() {
    //     onError?.()
    //   },
    // })
  }

  const handleDeleteReview = async ({
    params,
    onError,
    onSuccess,
  }: AsyncHandler<DeleteComment, any>) => {
    if (!token) return
    await userApi.deleteReview({ ...params })
    mutateProductDetail("delete")
    if (!data?.length) return
    mutate(
      [...data].filter((item) => item.id !== params.comment_id),
      false
    )

    // asyncHandler<AddComment, Comment>({
    //   fetcher: userApi.deleteReview({ ...params, token }),
    //   onSuccess(res) {
    //     if (!data) return

    //     mutate(
    //       produce(data, (draft) => {
    //         draft = draft.filter((item) => item.id !== params.comment_id)
    //       }),
    //       false
    //     )
    //     onSuccess?.(res)
    //   },
    //   onError: () => onError?.(),
    // })
  }

  const clearComments = () => {
    mutate([], false)
  }

  return {
    data,
    error,
    isValidating,
    handleAddReview,
    handleDeleteReview,
    clearComments,
  }
}

export { useReview }
