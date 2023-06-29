import { SetNotificationUserId, SetNotificationViewedParams } from "@/models"
import axiosClient from "."

const notificationApi = {
  setNotiUserId: (params: SetNotificationUserId) => {
    return axiosClient.post("/api/v3.0/main/get_player_id", {
      params,
    })
  },

  getNotifications: () => {
    return axiosClient.post("/api/v3.0/get_notifications", {
      params: {},
    })
  },

  setViewedNotification: (params: SetNotificationViewedParams) => {
    return axiosClient.post("/api/v3.0/check_notification_view", {
      params,
    })
  },

  setViewedAllNotification: () => {
    return axiosClient.post("/api/v3.0/check_all_notification", {
      params: {},
    })
  },
}

export default notificationApi
