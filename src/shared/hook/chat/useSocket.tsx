import { RootState, useAppDispatch } from "@/core/store"
import { MessageRes, UserRes } from "@/models"
import {
  fetchMessageUnreadCount,
  setChatProfile,
  setSocketInstance,
  updateMessageUnreadCount,
} from "@/modules"
import { useSelector } from "react-redux"
import { io, Socket } from "socket.io-client"
import { useChatNotification } from "./useChatNotification"

interface UseSocketRes {
  connectSocket: (cb?: (socket: Socket) => void) => Promise<Socket<any> | undefined>
}

export const useSocket = (): UseSocketRes => {
  const dispatch = useAppDispatch()
  const chatToken = useSelector((state: RootState) => state.user.chatToken)
  const { createNotification } = useChatNotification()

  // This function only run at first time
  const connectSocket = async () => {
    // if (!chatToken) return

    dispatch(fetchMessageUnreadCount())

    const socket = io(process.env.NEXT_PUBLIC_CHAT_API_URL as string, {
      query: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVhNGE0OTMxZjI5YTM2YWFlNTVjOGUiLCJ1c2VyX2lkIjo3NDAsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2Njg2MTY0MSwiZXhwIjoxNjY2OTQ4MDQxfQ.FyUKl7udkXNDpawACVdcLI7wxzT1Bc3aqu-UVCZL1Xc",
      },
      reconnectionDelay: 100000,
    })

    socket.emit("login")

    socket.on("connect", () => {
      if (socket.connected) {
        dispatch(setSocketInstance(socket))

        socket.on("login", (res: UserRes) => {
          dispatch(setChatProfile(res))
        })

        socket.on("receive_unread_message", (data: MessageRes) => {
          dispatch(updateMessageUnreadCount({ room_id: data.room_id, type: "increase" }))
          if (!window?.location?.pathname?.includes("/chat")) {
            createNotification(data)
          }
        })
      }
    })

    return socket
  }

  return {
    connectSocket,
  }
}
