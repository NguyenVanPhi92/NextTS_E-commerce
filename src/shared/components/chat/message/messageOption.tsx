/* eslint-disable @next/next/no-img-element */
import { useRef } from "react"
import { HiOutlineReply } from "react-icons/hi"

interface MessageOptionProps {
  onReply?: Function
  className?: string
}

export const MessageOption = ({ onReply, className = "" }: MessageOptionProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="relative">
      <div
        className={`absolute top-12 z-[101] px-12 rounded-[8px] h-[30px] flex-center bg-bg ${className}`}
      >
        <button onClick={() => onReply?.()} className="px-8">
          <HiOutlineReply className="text-base text-gray-color-3 hover:text-primary" />
        </button>
      </div>
    </div>
  )
}
