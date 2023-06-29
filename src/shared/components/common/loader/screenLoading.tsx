import { SpinnerIcon } from "@/assets"
import { toggleHTMLOverflow } from "@/helper"
import { useEffect } from "react"

export const ScreenLoading = () => {
  useEffect(() => {
    toggleHTMLOverflow("hidden")

    return () => {
      toggleHTMLOverflow("unset")
    }
  }, [])

  return (
    <div className="screen__loading">
      <div className="screen__loading-inner">
        <SpinnerIcon className="loader" />
        <span>Vui lòng chờ</span>
      </div>
    </div>
  )
}
