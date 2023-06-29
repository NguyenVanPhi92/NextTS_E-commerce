import { AsyncHandlerConfig, AsyncHandlerRoot } from "@/models"
import { setOpenScreenLoading } from "@/modules"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

export const useAsync = () => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState<boolean>(false)

  const asyncHandler = async <T, V>(_: AsyncHandlerRoot<T, V>) => {
    const { fetcher, config, onError, onSuccess } = _
    const {
      showScreenLoading = true,
      showErrorMessage = true,
      showSuccessMsg = true,
      successMsg,
      errorMsg,
    } = config || ({} as AsyncHandlerConfig)

    try {
      showScreenLoading && dispatch(setOpenScreenLoading(true))
      setLoading(true)

      const res: AxiosResponse<any> = await fetcher

      setLoading(false)
      showScreenLoading && dispatch(setOpenScreenLoading(false))

      if (res?.result?.success) {
        showSuccessMsg &&
          dispatch(notify(successMsg || res?.result?.message || (res as any)?.message, "success"))

        onSuccess?.(res?.result?.data)
      } else {
        showErrorMessage &&
          dispatch(
            notify(
              errorMsg ||
                res?.result?.message ||
                (res as any)?.message ||
                "Có lỗi xảy ra, vui lòng thử lại sau",
              "error"
            )
          )
        onError?.()
      }
    } catch (error) {
      showScreenLoading && dispatch(setOpenScreenLoading(false))
      dispatch(notify(errorMsg || "Có lỗi xảy ra, vui lòng thử lại sau", "error"))
      setLoading(false)
      onError?.()
    }
  }
  return {
    asyncHandler,
    isLoading,
  }
}
