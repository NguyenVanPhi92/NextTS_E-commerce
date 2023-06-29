import { Modal, OrderHistoryDetail, Pagination } from "@/components"
import { formatMoneyVND } from "@/helper"
import { OrderHistory } from "@/models"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { CgSmileNone } from "react-icons/cg"
import { HiOutlineArrowsExpand } from "react-icons/hi"
import { RiLoader4Line } from "react-icons/ri"
import { useOrderHistory } from "shared/hook"

const LIMIT = 12

export const OrderHistoryList = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLSelectElement>(null)
  const [saleOrderId, setSaleOrderId] = useState<number | undefined>()
  const [offset, setOffset] = useState<number>(0)
  const { data: orderHistory, isValidating, changePage } = useOrderHistory(LIMIT)

  return (
    <section ref={containerRef} className="order__history">
      {isValidating && orderHistory?.list_booking?.length === 0 ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      {!isValidating && orderHistory?.list_booking?.length > 0 ? (
        <table className="order__history-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th className="hide-on-md-table">Ngày</th>
              <th>Số Tiền</th>
              <th className="hide-on-xl-table">Trạng thái</th>
              <th className="hide-on-sm-table">Mô tả</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory?.list_booking &&
              orderHistory.list_booking.map((item: OrderHistory) => (
                <tr key={item.order_id}>
                  <td>
                    <span
                      className="cursor-pointer"
                      onClick={() => router.push(`/order-confirmed?sale_order_id=${item.order_id}`)}
                    >
                      {item.name}
                    </span>
                  </td>
                  <td className="hide-on-md-table">{item.create_date}</td>
                  <td>{formatMoneyVND(item.amount_total)}</td>
                  <td className="hide-on-xl-table">{item.state_name}</td>
                  <td className="hide-on-sm-table">{item?.note || "Không có ghi chú"}</td>
                  {/* <td className="hide-on-sm-table">{item.state_paid_name_name}</td> */}
                  <td>
                    <button onClick={() => setSaleOrderId(item.order_id)} className="btn-reset">
                      <span className="order__history-detail-btn">
                        <HiOutlineArrowsExpand />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}

      {!isValidating && orderHistory?.list_booking?.length === 0 ? (
        <div className="list--empty">
          <CgSmileNone />
          <p>Bạn chưa hoàn thành đơn hàng nào </p>
        </div>
      ) : null}

      {/* Modal */}
      {saleOrderId ? (
        <Modal
          heading="Chi tiết đơn hàng"
          direction="center"
          isShowModal={!!saleOrderId}
          handleClickModal={() => setSaleOrderId(undefined)}
        >
          <OrderHistoryDetail sale_order_id={saleOrderId} type="history" />
        </Modal>
      ) : null}

      <div className="">
        {orderHistory?.sales_summary?.total_sale || 0 > LIMIT ? (
          <Pagination
            currentOffset={offset}
            onPaginate={(offset: number) => {
              changePage(offset, () => {
                setOffset(offset)
              })
              containerRef.current?.scrollIntoView({ behavior: "smooth" })
            }}
            totalPage={Math.ceil((orderHistory?.sales_summary?.total_sale || 0) / LIMIT)}
          />
        ) : null}
      </div>
    </section>
  )
}
