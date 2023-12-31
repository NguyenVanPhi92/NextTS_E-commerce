import { Spinner } from "@/components"
import { ListRes, TagRes } from "@/models"
import { chatApi } from "@/services/chatApi"
import { IoClose } from "react-icons/io5"
import useSWR from "swr"

interface QuickMessageProps {
  onChange?: (_: string) => void
  onClose?: Function
}

export const QuickMessage = ({ onChange, onClose }: QuickMessageProps) => {
  const { error, data } = useSWR<ListRes<TagRes[]>>(
    "get_quick_message",
    () => chatApi.getTagMessageList({ limit: 30 }).then((res) => res.data),
    {
      dedupingInterval: 1000000000,
    }
  )

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex items-center justify-between px-16 py-16 border-b border-solid border-border-color">
        <p className="text-base font-semibold">Tin nhắn nhanh</p>
        <button onClick={() => onClose?.()} className="">
          <IoClose className="w-[20px] h-[20px] text-gray-color-4" />
        </button>
      </div>

      {error === undefined && data === undefined ? (
        <Spinner size={24} />
      ) : (
        <div className="h-full overflow-y-auto flex-1">
          {data?.data?.map((item) => (
            <div
              onClick={() => {
                onChange?.(item.text)
                onClose?.()
              }}
              className="py-12 px-16 hover:bg-bg cursor-pointer"
              key={item.tag_id}
            >
              <p className="text-sm leading-[20px]">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
