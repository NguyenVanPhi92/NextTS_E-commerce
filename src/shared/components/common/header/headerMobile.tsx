import { setOpenNavLeftModal, setOpenSearchModal } from "@/modules"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import { BiHomeAlt } from "react-icons/bi"
import { HiArrowLeft, HiMenu } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { useScrollTop } from "shared/hook"
import { SearchForm } from "../../form"

interface HeaderMobileProps {
  centerChild?: ReactNode
  rightChild?: ReactNode
  showHomeButton?: boolean
  showSearchInput?: boolean
  onClickBackBtn?: Function
}

export const HeaderMobile = ({
  centerChild,
  rightChild,
  showHomeButton,
  showSearchInput,
  onClickBackBtn,
}: HeaderMobileProps) => {
  const height = useScrollTop()
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div
      className={`header__mobile-container ${height > 60 ? "header__mobile-container-active" : ""}`}
    >
      <div className="header__mobile">
        <div className="header__mobile-left">
          {router.pathname === "/" ? (
            <button onClick={() => dispatch(setOpenNavLeftModal(true))} className="btn-reset">
              <HiMenu />
            </button>
          ) : (
            <button
              onClick={() => (onClickBackBtn ? onClickBackBtn() : router.back())}
              className="btn-reset"
            >
              <HiArrowLeft />
            </button>
          )}
        </div>
        <div className="header__mobile-center">
          {showSearchInput ? (
            <div onClick={() => dispatch(setOpenSearchModal(true))}>
              <SearchForm readOnly />
            </div>
          ) : null}
          {centerChild || null}
        </div>
        <div className="header__mobile-right">
          {showHomeButton ? (
            <button onClick={() => router.push("/")} className="btn-reset">
              <BiHomeAlt />
            </button>
          ) : null}

          {rightChild}
        </div>
      </div>
    </div>
  )
}
