import { CreateGroupChat, CreateSingleChat, RoomDetailRes, UseParams } from "@/models"
import { setCurrentRoomId } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

interface UseChatActionsRes {
  createSingleChat: (_: UseParams<CreateSingleChat, RoomDetailRes>) => void
  createGroupChat: (_: UseParams<CreateGroupChat, RoomDetailRes>) => void
}

export const useChatActions = (): UseChatActionsRes => {
  const router = useRouter()
  const dispatch = useDispatch()

  const redirectToChatPage = (roomId: string) => {
    router.push("/chat")
    dispatch(setCurrentRoomId(roomId))
  }

  const createSingleChat = (_: UseParams<CreateSingleChat, RoomDetailRes>) => {
    const { params, onSuccess, config, onError } = _

    // asyncHandler<RoomDetailRes>({
    //   fetcher: chatApi.createSingleChat(params),
    //   onSuccess: (data) => {
    //     router.push("/chat")
    //     redirectToChatPage(data.room_id)
    //     onSuccess?.(data)
    //   },
    //   onError: () => onError?.(),
    //   config: { ...config, showScreenLoading: true },
    // })
  }

  const createGroupChat = (_: UseParams<CreateGroupChat, RoomDetailRes>) => {
    const { params, onSuccess, config, onError } = _
    // asyncHandler<RoomDetailRes>({
    //   fetcher: chatApi.createGroupChat(params),
    //   onSuccess: (data) => {
    //     redirectToChatPage(data.room_id)
    //     onSuccess?.(data)
    //   },
    //   onError: () => onError?.(),
    //   config: { ...config, showScreenLoading: true },
    // })
  }

  return {
    createGroupChat,
    createSingleChat,
  }
}
