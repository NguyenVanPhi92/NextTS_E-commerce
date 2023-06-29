import { companyIcon, qrCodeImg } from "@/assets"
import { Spinner } from "@/components/common"
import { RootState } from "@/core/store"
import { formatMoneyVND, isObjectHasValue } from "@/helper"
import { OrderHistoryDetail as IOrderHistoryDetail } from "@/models"
import { API_URL } from "@/services"
import userApi from "@/services/userApi"
import Image from "next/image"
import { useRef } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface OrderHistoryDetailProps {
  type?: "history" | "order"
  sale_order_id: number
}

export const OrderHistoryDetail = ({ type, sale_order_id }: OrderHistoryDetailProps) => {
  const ref = useRef<any>()
  const token = useSelector((state: RootState) => state.user.token)

  const { data: order, isValidating } = useSWR<IOrderHistoryDetail | undefined>(
    token && sale_order_id ? `get_order_done_${sale_order_id}` : null,
    () =>
      userApi
        .getDetailOrderHistory({ sale_order_id: Number(sale_order_id) })
        .then((res: any) => res?.result?.data?.info_booking)
        .catch((err) => console.log(err))
  )

  if (isValidating)
    return (
      <div style={{ minHeight: "80vh" }}>
        <Spinner size={30} />
      </div>
    )

  if (!order) return null
  return (
    <div ref={ref}>
      {isObjectHasValue(order) ? (
        <div className="order__status">
          {type === "order" ? (
            <header className="order__status-header">
              <FiCheckCircle />
              <h3>Cảm ơn bạn đã đặt hàng!</h3>
              <p>
                Order code: <span>{order.name}</span>
              </p>
            </header>
          ) : null}
          <div className="order__status-body">
            <div className="order__status-summary">
              <ul className="order__status-summary-list">
                <li className="order__status-summary-list-item">
                  <h3>Ngày đặt hàng:</h3>
                  <p>{order.create_date}</p>
                </li>
                <li className="order__status-summary-list-item">
                  <h3>Tên KH:</h3>
                  <p>{order.partner_name}</p>
                </li>
                <li className="order__status-summary-list-item">
                  <h3>SĐT:</h3>
                  <p>{order.delivery_phone}</p>
                </li>
                <li className="order__status-summary-list-item">
                  <h3>Địa chỉ giao hàng:</h3>
                  <p>{order.delivery_address}</p>
                </li>

                <li className="order__status-summary-list-item">
                  <h3>Tình trạng đặt hàng:</h3>
                  <p>{order.state_name}</p>
                </li>
                <li className="order__status-summary-list-item">
                  <h3>Tổng số tiền đặt:</h3>
                  <p>{formatMoneyVND(order.amount_total)}</p>
                </li>
                <li className="order__status-summary-list-item">
                  <h3>Tình trạng vận chuyển:</h3>
                  <p>{order.state_delivery_name}</p>
                </li>
                <li className="order__status-summary-list-item">
                  <h3>Tình trạng thanh toán:</h3>
                  <p>{order.state_paid_name}</p>
                </li>
                {order?.code_delivery ? (
                  <li className="order__status-summary-list-item">
                    <h3>Mã đơn hàng:</h3>
                    <p>{order.code_delivery}</p>
                  </li>
                ) : null}
                {order?.url_tracking_delivery ? (
                  <li className="order__status-summary-list-item">
                    <h3>Link kiểm tra tình trạng đơn hàng:</h3>
                    <a
                      style={{ color: "blue" }}
                      href={order.url_tracking_delivery}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {order.url_tracking_delivery}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="order__status-detail">
              <h3 className="order__status-body-heading">Thông tin chuyển khoản</h3>
              <div className="order__status-detail-payment">
                <div className="order__status-detail-payment-left">
                  <div className="order__status-detail-payment-qr">
                    <Image src={qrCodeImg} layout="fill" alt="" objectFit="cover" />
                  </div>
                </div>

                <div className="order__status-detail-payment-right">
                  <ul className="order__status-summary-list">
                    <li className="order__status-summary-list-item">
                      <h3>Số tài khoản: </h3>
                      <p>102343252578</p>
                    </li>
                    <li className="order__status-summary-list-item">
                      <h3>Chủ tài khoản: </h3>
                      <p>TRẦN VĂN CƠ</p>
                    </li>
                    <li className="order__status-summary-list-item">
                      <h3>Ngân hàng: </h3>
                      <p>Vietcombank chi nhánh TPHCM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="order__status-detail">
              <h3 className="order__status-body-heading">Thông tin chuyển khoản</h3>
              <div className="order__status-detail-payment">
                <div className="order__status-detail-payment-left">
                  <div className="order__status-detail-payment-qr">
                    <Image src={qrCodeImg} layout="fill" alt="" objectFit="cover" />
                  </div>
                </div>

                <div className="order__status-detail-payment-right">
                  <ul className="order__status-summary-list">
                    <li className="order__status-summary-list-item">
                      <h3>Số tài khoản: </h3>
                      <p>102343252578</p>
                    </li>
                    <li className="order__status-summary-list-item">
                      <h3>Chủ tài khoản: </h3>
                      <p>TRẦN VĂN CƠ</p>
                    </li>
                    <li className="order__status-summary-list-item">
                      <h3>Ngân hàng: </h3>
                      <p>Vietcombank chi nhánh TPHCM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="order__status-detail">
              <h3 className="order__status-body-heading">Ghi chú giao hàng</h3>
              <p className="text-14 font-medium text-gray-color-7">
                {order?.delivery_message || "Chưa có ghi chú nào"}
              </p>
            </div>

            <div className="order__status-detail">
              <h3 className="order__status-body-heading">Ghi chú của admin</h3>
              <p className="text-14 font-medium text-gray-color-7">
                {order?.note || "Chưa có ghi chú nào được tạo"}
              </p>
              <p></p>
            </div>

            {order.products.length > 0 ? (
              <div className="order__status-detail">
                <h3 className="order__status-body-heading">Chi tiết đơn hàng</h3>
                <div className="order__status-detail-wrapper">
                  <div className="order__history-table-detail">
                    <div className="order__history-table-detail-heading">
                      <div className="order__history-table-detail-order order__history-table-detail-item">
                        #
                      </div>
                      <div className="order__history-table-detail-image order__history-table-detail-item"></div>
                      <div className="order__history-table-detail-name order__history-table-detail-item">
                        Sản phẩm
                      </div>
                      <div className="order__history-table-detail-qty order__history-table-detail-item">
                        Số lượng
                      </div>
                      <div className="order__history-table-detail-unit order__history-table-detail-item">
                        Đơn vị
                      </div>
                      <div className="order__history-table-detail-price order__history-table-detail-item">
                        Giá bán
                      </div>
                    </div>

                    <div className="order__history-table-detail-body">
                      {order.products?.map((item, index) => (
                        <div
                          className="order__history-table-detail-body-item"
                          key={item.product_id}
                        >
                          <div className="order__history-table-detail-order order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">Sản phẩm</p>
                            <p className="order__history-table-detail-item-title">{index + 1}</p>
                            <div className="image-container">
                              <Image
                                src={
                                  item.image_url?.[0]
                                    ? `${`${API_URL}${item.image_url?.[0] || ""}`}`
                                    : companyIcon
                                }
                                alt=""
                                className="image"
                                layout="fill"
                                quality={40}
                              />
                            </div>
                          </div>

                          <div className="order__history-table-detail-image order__history-table-detail-item">
                            <div className="image-container">
                              <Image
                                src={
                                  item.image_url?.[0]
                                    ? `${`${API_URL}${item.image_url?.[0] || ""}`}`
                                    : companyIcon
                                }
                                alt=""
                                className="image"
                                layout="fill"
                                quality={40}
                              />
                            </div>
                          </div>

                          <div className="order__history-table-detail-name order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">Tên:</p>
                            <p className="order__history-table-detail-item-title">{item.name}</p>
                          </div>

                          <div className="order__history-table-detail-qty order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">Số lượng:</p>
                            <p className="order__history-table-detail-item-title">
                              {item.quantity}
                            </p>
                          </div>
                          <div className="order__history-table-detail-unit order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">Đơn vị:</p>
                            <p className="order__history-table-detail-item-title">
                              {item.product_uom}
                            </p>
                          </div>
                          <div className="order__history-table-detail-price order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">Giá bán:</p>
                            <p className="order__history-table-detail-item-title">
                              {formatMoneyVND(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
