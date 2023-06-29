import { popupImg } from "@/assets"
import { API_URL } from "@/services"
import productApi from "@/services/productApi"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import useSWR from "swr"
import { Modal } from "../modal"

export const Popup = () => {
  const router = useRouter()
  const [isOpen, setOpen] = useState<boolean>(() => !sessionStorage.getItem("is_open_popup"))
  const { data } = useSWR(
    "get_popup_image",
    () =>
      productApi
        .getBanners({ type: "advertisement", radio: ["1:1"] })
        .then((res: any) => res?.result?.data?.[0]?.images?.[0] || ""),
    { revalidateOnFocus: false, dedupingInterval: 12000000 }
  )

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem("is_open_popup", "true")
  }

  return (
    <>
      {isOpen && data ? (
        <div className="popup-container">
          <Modal direction="center" isShowModal={isOpen} handleClickModal={handleClose}>
            <div
              style={{ cursor: "pointer" }}
              className="popup"
              onClick={() => {
                handleClose()
                router.push("/category")
              }}
            >
              <button onClick={handleClose} className="btn-reset popup-close-btn">
                <RiCloseFill />
              </button>
              <div className="image-container">
                <Image
                  className="image"
                  src={data ? `${API_URL}${data}` : popupImg}
                  alt=""
                  layout="fill"
                />
              </div>
            </div>
          </Modal>
        </div>
      ) : null}
    </>
  )
}
