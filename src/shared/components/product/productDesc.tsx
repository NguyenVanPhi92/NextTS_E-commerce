import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

export const ProductDesc = ({ desc }: { desc: string }) => {
  const router = useRouter()
  const [show, setShow] = useState<boolean>(false)
  const height = useRef<number>(0)

  useEffect(() => {
    height.current = document.querySelector(".product__detail-desc-content")?.clientHeight || 0
  }, [router.query])

  return (
    <div className="product__detail-desc">
      <div
        className={`product__detail-desc-content ${
          height.current >= 500 && show ? "" : "product__detail-desc-content-hide"
        }`}
      >
        <div className="product__tab-content-text">
          <div
            style={{ overflow: "hidden" }}
            className="product__tab-content-desc"
            dangerouslySetInnerHTML={{
              __html: desc || "",
            }}
          ></div>

          {!desc ? <p>Không có mô tả nào cho sản phẩm này</p> : null}
        </div>

        {height.current >= 500 && !show ? <div className="gradient"></div> : null}
      </div>

      {height.current >= 500 ? (
        <button onClick={() => setShow(!show)} className="btn-primary-outline">
          {show ? "Ẩn bớt nội dung" : "Xem thêm nội dung"}
        </button>
      ) : null}
    </div>
  )
}
