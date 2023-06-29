import { RootState } from "@/core/store"
import { setOpenModalConfirm } from "@/modules"
import { TiWarning } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"

interface ModalConfirmProps {
  onConfirm?: Function
}
export const ModalConfirm = ({ onConfirm }: ModalConfirmProps) => {
  const dispatch = useDispatch()
  const {
    modalConfirm: { isOpen, title, heading },
  } = useSelector((state: RootState) => state.common)

  const handleCloseModal = () => {
    dispatch(setOpenModalConfirm())
  }

  const handleConfirmModal = () => {
    if (!onConfirm) {
      dispatch(setOpenModalConfirm())
    } else {
      onConfirm()
      dispatch(setOpenModalConfirm())
    }
  }

  return (
    <>
      {isOpen ? (
        <>
          <section className="modal__confirm-container">
            <div className="modal__confirm">
              <header className="modal__confirm-header">
                <span className="modal__confirm-header-icon">
                  <TiWarning />
                </span>
                <h3 className="modal__confirm-header-heading">Bạn có chắc chắn?</h3>
              </header>
              <div className="modal__confirm-body">
                <p className="modal__confirm-body-desc">{title}</p>
              </div>
              <footer className="modal__confirm-footer">
                <button
                  onClick={handleCloseModal}
                  className="btn-primary modal__confirm-footer-btn modal__confirm-footer-btn-cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmModal}
                  className="btn-primary modal__confirm-footer-btn modal__confirm-footer-btn-delete"
                >
                  Xác nhận
                </button>
              </footer>
            </div>
          </section>

          <div
            className={`modal__confirm-overlay 
        ${isOpen ? "modal__confirm-overlay-active" : ""}
        `}
          ></div>
        </>
      ) : null}
    </>
  )
}
