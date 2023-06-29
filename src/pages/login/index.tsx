import { HeaderLogin, HeaderMobile, LoginForm } from "@/components"
import { LoginLayout } from "@/layout/login"
import { useRouter } from "next/router"

const Login = () => {
  const router = useRouter()

  return (
    <section className="login__page">
      <HeaderLogin title="Đăng nhập hoặc Tạo tài khoản" />
      <HeaderMobile
        onClickBackBtn={() => router.push("/")}
        centerChild={<p>Đăng nhập hoặc Tạo tài khoản</p>}
      />

      <div className="login__page-form">
        <LoginForm view="page" />
      </div>
    </section>
  )
}

Login.Layout = LoginLayout

export default Login
