import {
  changeUserStatusParams,
  ChatAxiosResponse,
  CreateGroupChat,
  CreateSingleChat,
  CreateUserParams,
  GetTokenParams,
  LikeMessage,
  LoginFormParams,
  MessageUnreadCountRes,
  QueryCommonParams,
  SendMessage,
  TokenRes,
  UpdateProfile,
  UpdateRoomInfo,
  UserRes,
} from "@/models"
import axios, { AxiosResponse } from "axios"
// import { store } from "../core"

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CHAT_API_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyMWQ1ODVlMjViODJhOTY2OTk1MzMiLCJ1c2VyX2lkIjoiY3VzdG9tZXJfMSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2NzM3NDUwNywiZXhwIjoxNjk4OTEwNTA3fQ.zGyT7IrokPF76wCg2IoDM8me7U7JtwR2mAHFYhbew-Q`,
  },
})

axiosClient.interceptors.request.use(async (config) => {
  // const chatToken = store?.getState()?.user?.chatToken
  // if (chatToken) {
  //   if (config?.headers?.["Authorization"]) config.headers["Authorization"] = `Bearer ${chatToken}`
  // }
  return config
})

try {
  axiosClient.interceptors.response.use(
    async (response) => {
      if (response?.data) {
        return response.data
      }
      return response
    },
    (err) => {
      throw err
    }
  )
} catch (error) {
  console.log(error)
}

const chatApi = {
  createUser: (params: CreateUserParams): Promise<ChatAxiosResponse<UserRes>> => {
    return axiosClient.post("/user", params)
  },

  updateUser: (params: UpdateProfile): Promise<ChatAxiosResponse<UserRes>> => {
    return axiosClient.patch("/user/profile", params)
  },

  generateToken: (params: GetTokenParams): Promise<ChatAxiosResponse<TokenRes>> => {
    return axiosClient.post("/user/generate_token", params)
  },

  createSingleChat: (params: CreateSingleChat) => {
    return axiosClient.post("/room/single", params)
  },

  createGroupChat: (params: CreateGroupChat) => {
    return axiosClient.post("/room/group", params)
  },

  getProfile: (id?: string) => {
    return axiosClient.get(`/user/profile${id ? `?user_id=${id}` : ""}`)
  },

  getMessageUnreadCount: (): Promise<AxiosResponse<MessageUnreadCountRes>> => {
    return axiosClient.get("/user/message_unread_count")
  },

  getRoomList: ({
    limit = 30,
    offset = 0,
    search_term,
  }: QueryCommonParams & { search_term?: string }) => {
    return axiosClient.get(
      `/room?limit=${limit}&offset=${offset}${search_term ? `&search_term=${search_term}` : ""}`
    )
  },

  getRoomDetail: (roomId: string) => {
    return axiosClient.get(`/room/${roomId}`)
  },

  getMessagesPinnedInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/room/${room_id}/messages_pinned?limit=${limit}&offset=${offset}`)
  },

  getMessagesInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/room/${room_id}/messages?limit=${limit}&offset=${offset}`)
  },

  getMembersInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/room/${room_id}/members?limit=${limit}&offset=${offset}`)
  },

  sendMessage: (params: SendMessage) => {
    return axiosClient.post("/message", params)
  },

  getMessageById: (msgId: string) => {
    return axiosClient.get(`/message/${msgId}`)
  },

  getTagMessageList: ({ limit = 30, offset = 0 }: QueryCommonParams) => {
    return axiosClient.get(`/tag?limit=${limit}&offset=${offset}`)
  },

  changeUserStatus: (params: changeUserStatusParams) => {
    return axiosClient.patch("/status", params)
  },
  getUserData: () => {
    return axiosClient.get("/user")
  },

  softDeleteRoomByCompoundingCarId: (
    compounding_car_id: number
  ): Promise<ChatAxiosResponse<{ compounding_car_id: number }>> => {
    return axiosClient.delete(`/room/compounding_car_id/${compounding_car_id}`)
  },

  restoreRoom: (room_id: string) => {
    return axiosClient.post(`/room/restore/${room_id}`)
  },

  // addMessageUnreadToRoom: (params: AddMessageUnread) => {
  //   return axiosClient.post("/room/message_unread", params)
  // },

  // clearMessageUnreadFromRoom: (roomId: string) => {
  //   return axiosClient.delete(`/room/${roomId}/message_unread`)
  // },

  // confirmReadMessage: (message_id: string) => {
  //   return axiosClient.patch(`/message/read`, { message_id })
  // },

  confirmReadAllMessageInRoom: (room_id: string) => {
    return axiosClient.patch(`/message/read_all`, { room_id })
  },

  login: (params: LoginFormParams) => {
    return axiosClient.post(`/user/login`, params)
  },

  logout: () => {
    return axiosClient.post(`/user/logout`)
  },

  refreshToken: () => {
    return axiosClient.post(`/user/refresh`)
  },

  likeMessage: (params: LikeMessage) => {
    return axiosClient.post(`/message/like`, params)
  },

  unlikeMessage: (messageId: string) => {
    return axiosClient.delete(`/message/unlike/${messageId}`)
  },

  getUsersLikedMessage: (messageId: string) => {
    return axiosClient.get(`/message/users/like/${messageId}`)
  },

  getUsersReadMessage: (messageId: string) => {
    return axiosClient.get(`/message/users/read/${messageId}`)
  },

  uploadSingleImage: (formData: FormData) => {
    return axiosClient.post(`/attachment/image/single`, formData)
  },

  uploadMultipleImage: (formData: FormData) => {
    return axiosClient.post(`/attachment/image/multiple`, formData)
  },

  uploadMultipleVideo: (formData: FormData) => {
    return axiosClient.post(`/attachment/video/multiple`, formData)
  },

  uploadSingleVideo: (formData: FormData) => {
    return axiosClient.post(`/attachment/video/single`, formData)
  },

  deleteAttachment: (id: string) => {
    return axiosClient.delete(`/attachment/${id}`)
  },

  getDetailMessage: (id: string) => {
    return axiosClient.get(`/message/detail/${id}`)
  },

  leaveRoomByCompoundingCarId: (compounding_car_id: number) => {
    return axiosClient.delete(`/room/compounding_car_id/${compounding_car_id}/leave`)
  },

  joinRoomByCompoundingCarId: (compounding_car_id: number) => {
    return axiosClient.post(`/room/compounding_car_id/${compounding_car_id}/join`)
  },

  updateRoomInfo: (params: UpdateRoomInfo) => {
    const { room_id, ...rest } = params
    return axiosClient.patch(`/room/info/${room_id}`, rest)
  },
}

export { chatApi }
