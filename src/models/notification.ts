export interface SetNotificationUserId {
  player_id: string
  status?: "logout"
}

export interface NotificationItem {
  id: number
  name: string
  content: string
  is_view: boolean
  create_date: string
}

export interface Notification {
  notification_counts: number
  notifications: NotificationItem[]
}

export interface SetNotificationViewedParams {
  notification_id: number
}
