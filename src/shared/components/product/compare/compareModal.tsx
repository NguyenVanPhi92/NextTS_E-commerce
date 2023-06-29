import { Compare, Modal, ModalHeading } from "@/components"
import { toggleShowCompareModal } from "@/modules"
import { useDispatch } from "react-redux"

export const CompareModal = () => {
  const dispatch = useDispatch()

  return (
    <Modal
      isShowModal={true}
      handleClickModal={() => dispatch(toggleShowCompareModal(false))}
      direction="center"
    >
      <ModalHeading handleClose={() => dispatch(toggleShowCompareModal(false))} title="So Sánh" />
      <div className="compare-modal">
        <Compare />
      </div>
    </Modal>
  )
}
