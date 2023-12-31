import { MessageFormData } from "@/models"
import { ChangeEvent, useRef, useState } from "react"
import { MdOutlineInsertPhoto } from "react-icons/md"
import { TbMessageShare } from "react-icons/tb"
import { useClickOutside } from "shared/hook"
import { QuickMessage } from "./quickMessage"

interface MessageFormOptionProps {
  data: MessageFormData
  onInputFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onQuickMessageChange?: (val: string) => void
}

export const MessageFormOption = ({
  data,
  onInputFileChange,
  onQuickMessageChange,
}: MessageFormOptionProps) => {
  const quickMessageRef = useRef<HTMLDivElement>(null)
  const [showQuickMessage, setShowQuickMessage] = useState<boolean>(false)

  useClickOutside([quickMessageRef], () => {
    setShowQuickMessage(false)
  })

  return (
    <>
      <div className="flex">
        <div
          ref={quickMessageRef}
          className="message-form-quickMessage-wrapper sm:relative md:static lg:relative mr-4 md:mr-8"
        >
          {showQuickMessage ? (
            <div className="absolute z-[1000] right-0 sm:right-[unset] sm:left-[-340px] md:right-0 md:left-[unset] lg:right-[unset] lg:left-[-340px] max-w-[380px] w-[calc(100vw-40px)] h-[300px] top-[-302px] sm:top-[-310px] md:top-[-302px] lg:top-[-310px] bg-white-color shadow-lg rounded-[8px] border border-solid border-border-color message-form-quickMessage-popup">
              <QuickMessage
                onClose={() => setShowQuickMessage(false)}
                onChange={(val) => onQuickMessageChange?.(val)}
              />
            </div>
          ) : null}

          <button
            className={`w-[28px] h-[28px] md:w-[40px] md:h-[40px] rounded-[8px] flex-center duration-150 text-sm font-semibold transition-colors ${
              showQuickMessage ? "bg-gray-10" : "hover:bg-gray-10 bg-gray-05"
            }`}
            onClick={() => setShowQuickMessage(true)}
          >
            <TbMessageShare
              style={{ color: showQuickMessage ? "#2E41B6" : "#595959" }}
              className="text-base md:text-lg"
            />
          </button>
        </div>

        <div className="mr-4 md:mr-8">
          <input
            onChange={onInputFileChange}
            hidden
            type="file"
            name=""
            multiple
            id="message-attachment"
            accept="image/*"
          />
          <label
            className={`w-[28px] h-[28px] md:w-[40px] md:h-[40px] duration-150 transition-colors rounded-[8px] flex-center cursor-pointer ${
              data?.attachments?.length ? "bg-gray-10" : "hover:bg-gray-10 bg-gray-05"
            }`}
            htmlFor="message-attachment"
            id="message-attachment"
          >
            <MdOutlineInsertPhoto
              className={`pointer-events-none w-[20px] h-[20px] ${
                !data?.attachments?.length ? "text-gray-color-3" : "text-primary"
              }`}
            />
          </label>
        </div>
      </div>
    </>
  )
}
