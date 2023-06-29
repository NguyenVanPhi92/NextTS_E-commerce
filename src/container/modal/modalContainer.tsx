import { logo2 } from "@/assets"
import {
  AddressForm,
  CartModal,
  CategoryMobile,
  CompareModal,
  ImageShow,
  LoginForm,
  Modal,
  ModalHeading,
  ModalProductDetail,
  ModalProductComboDetail,
  Navigation,
  OTP,
  ScreenLoading,
  SearchProducts,
} from "@/components"
import { RootState } from "@/core/store"
import {
  setOpenCartModal,
  setOpenCategoryModal,
  setOpenLoginModal,
  setOpenModalAddressForm,
  setOpenNavLeftModal,
  setOpenOtpLoginModal,
  setOpenSearchModal,
} from "@/modules"
import Image from "next/image"
import Link from "next/link"
import { IoCloseCircleSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"

export const ModalContainer = () => {
  const dispatch = useDispatch()
  const product = useSelector((state: RootState) => state.product.product)
  const productCombo = useSelector((state: RootState) => state.combo.combo)
  const isOpenModalProduct = useSelector((state: RootState) => state.common.isOpenModalProduct)
  const isOpenModalProductCombo = useSelector(
    (state: RootState) => state.common.isOpenModalProductCombo
  )
  const isOpenCartModal = useSelector((state: RootState) => state.common.isOpenCartModal)
  const isOpenSearchModal = useSelector((state: RootState) => state.common.isOpenSearchModal)
  const isOpenCategoryModal = useSelector((state: RootState) => state.common.isOpenCategoryModal)
  const isOpenNavLeftModal = useSelector((state: RootState) => state.common.isOpenNavLeftModal)
  const isOpenScreenLoading = useSelector((state: RootState) => state.common.isOpenScreenLoading)
  const isOpenAddressForm = useSelector((state: RootState) => state.common.isOpenAddressForm)
  const isOpenOtpLoginModal = useSelector((state: RootState) => state.common.isOpenOtpLoginModal)
  const isOpenLoginSMSModal = useSelector((state: RootState) => state.common.isOpenLoginSMSModal)
  const isOpenLoginModal = useSelector((state: RootState) => state.common.isOpenLoginModal)
  const previewImageUrl = useSelector((state: RootState) => state.common.previewImageUrl)
  const isShowCompareModal = useSelector((state: RootState) => state.compare.isShowCompareModal)

  return (
    <section className="modal__container">
      {isShowCompareModal ? (
        <div className="modal__container-compare">
          <CompareModal />
        </div>
      ) : null}
      {isOpenModalProduct && product ? <ModalProductDetail /> : null}
      {isOpenModalProductCombo && productCombo ? <ModalProductComboDetail /> : null}
      {isOpenCartModal ? (
        <Modal
          isShowModal={isOpenCartModal}
          handleClickModal={() => dispatch(setOpenCartModal(false))}
          direction="right"
        >
          <div className="cart__modal-wrapper">
            <ModalHeading handleClose={() => dispatch(setOpenCartModal(false))} title="Giỏ Hàng" />
            <CartModal />
          </div>
        </Modal>
      ) : null}

      {isOpenNavLeftModal ? (
        <Modal
          isShowModal={isOpenNavLeftModal}
          handleClickModal={() => dispatch(setOpenNavLeftModal(false))}
          direction="left"
        >
          <div className="menu__mobile">
            <header className="menu__mobile-header">
              <Link passHref href="/">
                <div onClick={() => dispatch(setOpenNavLeftModal(false))}>
                  <div className="image-container menu__mobile-header-img">
                    <Image src={logo2} alt="" layout="fill" className="image" />
                  </div>
                </div>
              </Link>
              <button onClick={() => dispatch(setOpenNavLeftModal(false))} className="btn-reset">
                <IoCloseCircleSharp />
              </button>
            </header>
            <Navigation handleClickModal={() => dispatch(setOpenNavLeftModal(false))} />
          </div>
        </Modal>
      ) : null}

      {isOpenCategoryModal ? (
        <Modal
          direction="right"
          isShowModal={isOpenCategoryModal}
          handleClickModal={() => {
            dispatch(setOpenCategoryModal(false))
          }}
        >
          <ModalHeading
            handleClose={() => dispatch(setOpenCategoryModal(false))}
            title="Danh mục"
          />
          <CategoryMobile />
        </Modal>
      ) : null}

      {/* Search Mobile */}
      {isOpenSearchModal ? (
        <Modal
          fullWidth
          direction="right"
          disableAnimation
          isShowModal={true}
          handleClickModal={() => dispatch(setOpenSearchModal(false))}
        >
          <div className="nav__mobile-search-wrapper">
            <SearchProducts device="mobile" />
          </div>
        </Modal>
      ) : null}

      {isOpenAddressForm ? (
        <div className="modal__address">
          <Modal
            unsetSize={true}
            disableOverLay={true}
            direction="center"
            isShowModal={true}
            heading={"Địa chỉ mới"}
            isShowConfirmModal={true}
            handleClickModal={() => dispatch(setOpenModalAddressForm(false))}
          >
            <AddressForm />
          </Modal>
        </div>
      ) : null}

      {isOpenOtpLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            disableAnimation
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(setOpenOtpLoginModal(false))}
          >
            <OTP view="modal" type="updatePhoneNumber" />
          </Modal>
        </div>
      ) : null}

      {isOpenLoginSMSModal ? (
        <div className="modal__otp-container">
          <Modal
            disableAnimation
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(setOpenOtpLoginModal(false))}
          >
            <OTP view="modal" type="login" />
          </Modal>
        </div>
      ) : null}

      {isOpenLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            unsetSize
            disableAnimation
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(setOpenLoginModal(false))}
          >
            <LoginForm view="modal" />
          </Modal>
        </div>
      ) : null}
      {isOpenScreenLoading ? <ScreenLoading /> : null}
      {previewImageUrl ? <ImageShow url={previewImageUrl} /> : null}
    </section>
  )
}
