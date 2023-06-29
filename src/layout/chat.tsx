import { ChatPopup } from "@/components"
import React from "react"
import { useSocket } from "shared/hook"

export const WithChat = () => {
  const { connectSocket } = useSocket()

  return (
    <div>
      <ChatPopup />
    </div>
  )
}
