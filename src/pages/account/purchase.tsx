/* eslint-disable @next/next/no-img-element */
import { Purchase } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"

const PurchasePage = () => {
  return (
    <AccountContainer
      headerMobileTitle="Đơn mua"
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { name: "Đơn mua", path: "" },
      ]}
      heading="Danh sách đơn mua"
    >
      <Purchase />
    </AccountContainer>
  )
}

PurchasePage.Layout = MainAuthLayout

export default PurchasePage
