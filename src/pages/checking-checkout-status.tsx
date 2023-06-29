import { CheckCircleIcon, ErrorCircleIcon, WarningIcon } from "@/assets"
import { CountdownRedirect, Spinner } from "@/components"
import { VNPAY_STATUS_NAME } from "@/helper"
import orderApi from "@/services/orderApi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CheckoutProcess = () => {
  const router = useRouter()
  const [isValidating, setValidating] = useState<boolean>(false)
  const [countdown, _] = useState<number | undefined>(30)
  const { vnp_ResponseCode, sale_order_id } = router.query

  useEffect(() => {
    if (vnp_ResponseCode !== "00") return

    setValidating(true)

    orderApi
      .confirmTransaction({ sale_order_id: Number(sale_order_id) })
      .then((res: any) => {
        setValidating(false)

        if (res.result?.success) {
          router.push("/checkout")
        }
      })
      .catch(() => {
        setValidating(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full">
      {isValidating ? (
        <div className="flex flex-col bg-info-10 rounded-[8px] p-custom">
          <div className=" flex-center flex-col">
            <WarningIcon
              color="#007BFF"
              className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] mb-12 sm:mb-24"
            />
            <p className="text-18 md:text-[22px] text-center text-info font-semibold">
              Đang xử lý giao dịch
            </p>
            <div className="my-16 border-b border-info border-solid w-full"></div>

            <p className="text-sm text-center">
              Giao dịch đang trong quá trình thanh toán, vui lòng chờ thông tin hoặc liên hệ Tổng
              đài ExxeVn nếu cần thêm hỗ trợ
            </p>
          </div>

          <div className="fixed z-[2000] bg-[rgba(0,0,0,0.4)] inset-0 flex justify-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <div
            style={{ backgroundColor: vnp_ResponseCode === "00" ? "#F4FDF7" : "#FDF3F3" }}
            className="p-16 sm:p-[32px] flex-center flex-col mb-24 rounded-[8px]"
          >
            {vnp_ResponseCode === "00" ? (
              <CheckCircleIcon className="text-success w-[66px] h-[66px] mb-24" />
            ) : (
              <ErrorCircleIcon className="w-[66px] h-[66px] mb-24" />
            )}
            <p
              style={{ color: vnp_ResponseCode === "00" ? "#008F5D " : "#FF3B30" }}
              className="text-18 md:text-[22px] text-center font-semibold"
            >
              {vnp_ResponseCode === "00" ? "Giao dịch thành công" : "Giao dịch không thành công"}
            </p>
            <div
              style={{ borderColor: vnp_ResponseCode === "00" ? "#A7F2C1" : "#F2A0A0" }}
              className="my-16 border-b border-solid w-full"
            ></div>
            <p className="text-sm ml-12 leading-[22px] flex-1 text-center">
              {VNPAY_STATUS_NAME[vnp_ResponseCode as any]}
            </p>
          </div>

          <div className="flex-center flex-col">
            <button onClick={() => router.push("/checkout")} className="btn-primary mb-24">
              Trở về trang thanh toán
            </button>

            {countdown ? (
              <p className="text-sm">
                <span className="text-sm text-gray-color-7">Tự động chuyển hướng sau </span>
                <CountdownRedirect
                  onExpiredCoundown={() => router.push("/checkout")}
                  secondsRemains={countdown}
                />
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}

export default CheckoutProcess