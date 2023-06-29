import {
  AttachmentRes,
  MessageAttachment,
  MessageForm,
  MessageFormData,
  MessageReply,
  MessageUnreadCountRes,
  PayloadType,
  RoomInfoRes,
  RoomTypingRes,
  TopMemberRes,
  UserRes,
} from "@/models"
import { chatApi } from "@/services/chatApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client"

export const fetchMessageUnreadCount = createAsyncThunk(
  "chat/fetchMessageUnreadCount",
  async () => (await chatApi.getMessageUnreadCount())?.data
)

interface ChatSlice {
  currentTyping: RoomTypingRes | undefined
  socket: Socket<any> | undefined
  messageFormData: MessageFormData[]
  profile: UserRes | undefined
  messageUnreadCount: MessageUnreadCountRes | undefined
  currentMessageEmotionId: string | undefined
  currentDetailMessageId: string | undefined
  currentProfileId: string | undefined
  currentRoomId: string | undefined
  currentPreviewImages: string[] | undefined
  currentRoomInfo: RoomInfo | undefined
  currentMessageFormDataIndex: number
  accessToken: string | undefined
  showChatPopup: boolean | undefined
}

const initialState: ChatSlice = {
  currentTyping: undefined,
  messageUnreadCount: undefined,
  socket: undefined,
  messageFormData: [],
  profile: undefined,
  currentMessageEmotionId: undefined,
  currentDetailMessageId: undefined,
  currentProfileId: undefined,
  currentRoomId: undefined,
  currentPreviewImages: undefined,
  currentRoomInfo: undefined,
  currentMessageFormDataIndex: -1,
  accessToken: undefined,
  showChatPopup: undefined,
}

type RoomInfo = RoomInfoRes & {
  members: TopMemberRes[]
}

const chatSlice = createSlice({
  name: "chat_slice",
  initialState,
  reducers: {
    setCurrentTyping: (state, { payload }: PayloadType<RoomTypingRes | undefined>) => {
      state.currentTyping = payload
    },

    checkForUserDisconnectWhenTyping: (state, { payload }: PayloadType<string>) => {
      if (state.currentTyping?.user_id === payload) {
        state.currentTyping = undefined
      }
    },

    setAccessToken: (state, { payload }: PayloadType<string | undefined>) => {
      state.accessToken = payload
    },

    setShowChatPopup: (state, { payload }: PayloadType<boolean | undefined>) => {
      state.showChatPopup = payload
    },

    setCurrentRoomInfo: (state, { payload }: PayloadType<RoomInfo | undefined>) => {
      state.currentRoomInfo = payload
    },

    setMessageUnreadCount: (state, { payload }: { payload: MessageUnreadCountRes | undefined }) => {
      state.messageUnreadCount = payload
    },

    updateMessageUnreadCount: (
      state,
      { payload }: { payload: { room_id: string; type: "increase" | "decrease" } }
    ) => {
      if (!state?.messageUnreadCount?.room_ids) return
      const { room_id, type } = payload

      if (type === "decrease") {
        const data = state.messageUnreadCount?.room_ids?.filter((id) => id !== room_id)
        state.messageUnreadCount.room_ids = data
        state.messageUnreadCount.message_unread_count = data?.length
      } else {
        const isDuplicate = state.messageUnreadCount?.room_ids?.includes(room_id)
        if (isDuplicate) return

        state.messageUnreadCount.room_ids.push(room_id)
        state.messageUnreadCount.message_unread_count += 1
      }
    },

    updateCurrentRoomInfo: (
      state,
      {
        payload,
      }: PayloadType<{ room_name?: string; room_avatar?: AttachmentRes | null; room_id: string }>
    ) => {
      if (payload.room_id !== state.currentRoomInfo?.room_id) return

      if (payload.room_name) {
        state.currentRoomInfo.room_name = payload.room_name
      }
      if (payload.room_avatar) {
        state.currentRoomInfo.room_avatar = payload.room_avatar
      }
    },

    setCurrentMessageEmotionId: (state, { payload }: PayloadType<string | undefined>) => {
      state.currentMessageEmotionId = payload
    },

    setCurrentPreviewImages: (state, { payload }: PayloadType<string[] | undefined>) => {
      state.currentPreviewImages = payload
    },

    setCurrentRoomId: (state, { payload }: PayloadType<string | undefined>) => {
      if (payload === state.currentRoomId) return

      if (state.currentTyping?.room_id === payload) {
        state.currentTyping = undefined
      }

      if (state.currentRoomId) {
        state.socket?.emit("leave_room", state.currentRoomId)
      }

      state.currentRoomId = payload

      if (payload) {
        //Sự kiện dùng để tham gia vào phòng chat
        state.socket?.emit("join_room", payload)

        const index = (state?.messageFormData || [])?.findIndex((item) => item.room_id === payload)

        if (index === -1) {
          state.currentMessageFormDataIndex = state?.messageFormData?.length || 0

          state.messageFormData.push({
            room_id: payload,
            text: "",
          })
        } else {
          state.currentMessageFormDataIndex = index
        }
      } else {
        state.currentMessageFormDataIndex = -1
      }
    },

    setCurrentProfileId: (state, { payload }: PayloadType<string | undefined>) => {
      state.currentProfileId = payload
    },

    setcurrentDetailMessageId: (state, { payload }: PayloadType<string | undefined>) => {
      state.currentDetailMessageId = payload
    },

    setSocketInstance: (state, { payload }: PayloadType<Socket<any> | undefined>) => {
      state.socket = payload as any
    },

    setMessageDataInRoom: (state, { payload }: PayloadType<MessageForm>) => {
      const index = state.currentMessageFormDataIndex
      if (index === -1) return

      state.messageFormData[index] = { ...state.messageFormData[index], ...payload }
    },

    resetMessageDataInRoom: (state) => {
      const index = state.currentMessageFormDataIndex
      if (index === -1) return

      state.messageFormData[index] = {
        room_id: state.messageFormData[index].room_id,
        text: "",
      }
    },

    addMessageAttachment: (state, { payload }: PayloadType<MessageAttachment[]>) => {
      const index = state.currentMessageFormDataIndex
      if (index === -1) return

      if (!state?.messageFormData[index]?.attachments?.length) {
        state.messageFormData[index].attachments = payload
      } else {
        ;(state.messageFormData[index].attachments as any[]) = [
          ...(state.messageFormData[index]?.attachments || []),
          ...payload,
        ]
      }
    },

    setMessageReply: (state, { payload }: PayloadType<MessageReply | undefined>) => {
      const index = state.currentMessageFormDataIndex
      if (index === -1) return

      state.messageFormData[index].reply_to = payload
    },

    setMessageText: (state, { payload }: PayloadType<string>) => {
      const index = state.currentMessageFormDataIndex
      if (index !== -1) {
        state.messageFormData[index].text = payload
      }
    },

    setChatProfile: (state, { payload }: PayloadType<UserRes>) => {
      state.profile = payload
    },

    deleteMessageAttachment: (state, { payload }: PayloadType<{ imageId: string }>) => {
      if (!state.currentRoomId) return
      const index = state.currentMessageFormDataIndex
      if (index === -1) return

      state.messageFormData[index].attachments = (
        state?.messageFormData[index]?.attachments as MessageAttachment[]
      )?.filter((item) => item.id !== payload.imageId)
    },

    resetChatState: (state) => {
      state.currentTyping = undefined
      state.socket = undefined
      state.messageFormData = []
      state.profile = undefined
      state.messageUnreadCount = undefined
      state.currentMessageEmotionId = undefined
      state.currentDetailMessageId = undefined
      state.currentProfileId = undefined
      state.currentRoomId = undefined
      state.currentPreviewImages = undefined
      state.currentRoomInfo = undefined
      state.currentMessageFormDataIndex = -1
      state.accessToken = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessageUnreadCount.fulfilled, (state, { payload }) => {
      state.messageUnreadCount = payload
    })
  },
})

export default chatSlice.reducer
export const {
  setCurrentTyping,
  setSocketInstance,
  resetMessageDataInRoom,
  setMessageDataInRoom,
  addMessageAttachment,
  deleteMessageAttachment,
  setMessageText,
  setChatProfile,
  setMessageReply,
  setCurrentMessageEmotionId,
  checkForUserDisconnectWhenTyping,
  setcurrentDetailMessageId,
  setCurrentProfileId,
  setCurrentRoomId,
  setCurrentPreviewImages,
  setCurrentRoomInfo,
  updateCurrentRoomInfo,
  setAccessToken,
  setMessageUnreadCount,
  updateMessageUnreadCount,
  resetChatState,
  setShowChatPopup,
} = chatSlice.actions
