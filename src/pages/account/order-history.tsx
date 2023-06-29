import { OrderHistoryList } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"

const OrderHistory: any = () => {
  return (
    <AccountContainer
      headerMobileTitle="Lịch sử đơn hàng"
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { name: "Lịch sử đơn hàng", path: "" },
      ]}
      heading="Lịch sử đơn hàng"
    >
      <OrderHistoryList />
    </AccountContainer>
  )
}

OrderHistory.Layout = MainAuthLayout

export default OrderHistory
