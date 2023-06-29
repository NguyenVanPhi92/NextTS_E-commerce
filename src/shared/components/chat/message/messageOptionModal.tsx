import { useRef } from "react"
import { HiOutlineReply } from "react-icons/hi"
import { TbCopy } from "react-icons/tb"
import { useClickOutside } from "shared/hook"

interface MessageOptionModalProps {
  onClose: Function
  onReply?: () => void
  onCopy?: () => void
}

export const MessageOptionModal = ({ onClose, onCopy, onReply }: MessageOptionModalProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside([ref], () => {
    onClose?.()
  })

  return (
    <div className="fixed z-[3000] inset-0 flex lg:hidden justify-center items-end">
      <div ref={ref} className="z-10 mb-[100px]">
        <div className="flex bg-white-color py-12 px-12 rounded-[8px]">
          <button
            onClick={() => {
              onReply?.()
              onClose?.()
            }}
            className="flex-center flex-col mr-16 p-12"
          >
            <HiOutlineReply className="text-[20px] text-gray-color-3 mb-4" />
            <p className="text-[10px] leading-[14px] font-medium text-gray-color-3">Trả lời</p>
          </button>

          <button
            className="flex-center flex-col p-12"
            onClick={() => {
              onCopy?.()
              onClose?.()
            }}
          >
            <TbCopy className="text-[20px] text-gray-color-3 mb-4" />
            <p className="text-[10px] leading-[14px] font-medium text-gray-color-3">Copy</p>
          </button>
        </div>
      </div>
      <div onClick={() => onClose?.()} className="absolute inset-0 bg-black-40"></div>
    </div>
  )
}
