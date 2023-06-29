import { Breadcrumb, OrderHistoryDetail } from "@/components"
import { MainAuthLayoutNoFooter } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const OrderConfirmed = () => {
  const router = useRouter()
  const { sale_order_id } = router.query

  const render = () => {
    if (typeof sale_order_id === "string") {
      return (
        <div className="order__confirm">
          <OrderHistoryDetail type="order" sale_order_id={Number(sale_order_id)} />
        </div>
      )
    }

    return (sale_order_id as string[])?.map((item, index) => (
      <div key={index} className="order__confirm mb-24">
        <OrderHistoryDetail type="order" sale_order_id={Number(item)} />
      </div>
    ))
  }

  return (
    <section className="order__confirm-container">
      <div className="container">
        <Breadcrumb breadcrumbList={[{ name: "Chi Tiết đơn hàng", path: "" }]} />
      </div>

      {render()}

      <div className="mb-24">
        <Link href="/">
          <a className="btn-primary-outline mx-auto mt-24 w-fit">Về trang chủ</a>
        </Link>
      </div>
    </section>
  )
}

OrderConfirmed.Layout = MainAuthLayoutNoFooter

export default OrderConfirmed
