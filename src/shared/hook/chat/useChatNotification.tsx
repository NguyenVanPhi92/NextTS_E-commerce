import { RootState } from "@/core/store"
import { getMessageDescription } from "@/helper"
import { MessageRes } from "@/models"
import { setCurrentRoomId } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const useChatNotification = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const currentRoomId = useSelector((state: RootState) => state.chat.currentRoomId)

  const createNotification = (data: MessageRes) => {
    Notification.requestPermission().then((per) => {
      if (per === "granted") {
        const notification = new Notification(data?.author?.author_name || "Tin nhắn mới", {
          badge: data.author?.author_avatar?.thumbnail_url,
          icon: data.author?.author_avatar?.thumbnail_url,
          body: getMessageDescription(data),
          tag: data.room_id,
        })

        notification.addEventListener("click", () => {
          if (currentRoomId !== data.room_id) {
            if (!window.location?.pathname?.includes("/chat")) {
              router.push("/chat")
              dispatch(setCurrentRoomId(data.room_id))
            } else {
              dispatch(setCurrentRoomId(data.room_id))
            }
          }
        })
      }
    })
  }

  return { createNotification }
}
