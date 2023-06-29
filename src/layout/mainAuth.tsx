import { LayoutProps } from "@/models"
import { logout, resetOrderData } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "shared/hook"
import { RootState } from "../core"
import { App } from "./app"
import { MainLayout } from "./main"

export const MainAuthLayout = ({ children }: LayoutProps) => {
  const token = useSelector((state: RootState) => state.user.token)
  const router = useRouter()
  const { getUserInfo } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    } else {
      getUserInfo({
        onError: () => {
          dispatch(logout())
          dispatch(resetOrderData())
          router.push("/login")
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <App>
      <MainLayout>{children}</MainLayout>
    </App>
  )
}
