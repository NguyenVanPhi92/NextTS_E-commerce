import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import { Chat } from "./chat"
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentRoomId, setShowChatPopup } from "@/modules"
import { useRouter } from "next/router"
import { RootState } from "@/core/index"

interface ChatPopupProps {
  className?: string
}

export const ChatPopup = ({ className = "" }: ChatPopupProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const showChat = useSelector((state: RootState) => state.chat.showChatPopup)
  const chatToken = useSelector((state: RootState) => state.user.chatToken)
  // const [showChat, dispatch(setShowChatPopup(false))

  if (chatToken) return null
  return (
    <div className="hidden lg:block">
      <div
        className={`fixed right-24 bottom-0 z-[1001] transition-all duration-300 transform hidden lg:block overflow-hidden ${
          showChat
            ? "block visible opacity-100 bottom-0 scale-100"
            : "invisible opacity-0 scale-0 bottom-[-620px]"
        } rounded-tl-[16px] rounded-tr-[16px] bg-white-color shadow-lg border border-solid border-border-color w-[400px] h-[620px] ${className}`}
      >
        <div className="py-16 flex-center border-b border-border-color border-solid px-16 h-[54px]">
          <p className="text-base font-semibold leading-[22px] flex-1 text-center ml-24">
            Tin nhắn
          </p>
          <button
            onClick={() => {
              dispatch(setShowChatPopup(false))
              dispatch(setCurrentRoomId(undefined))
            }}
          >
            <IoClose className="text-[20px] text-gray-color-3" />
          </button>
        </div>

        <div className={`chat-popup`}>
          <Chat view="popup" />
        </div>
      </div>

      <div
        className={`fixed right-24 bottom-0 z-[1000] transition-all duration-300 ${
          showChat ? "invisible opacity-0" : "visible opacity-100"
        }`}
      >
        <button
          onClick={() => {
            dispatch(setShowChatPopup(true))
          }}
          className={`btn-primary text-[14px] font-medium py-12 px-[18px] ml-auto ${
            showChat ? "hidden" : "hidden lg:flex"
          }`}
        >
          <span className="mr-4">Tin nhắn</span>
          <HiOutlineChatBubbleBottomCenterText />
        </button>

        <button
          onClick={() => {
            router.push("/chat")
          }}
          className={`btn-primary lg:hidden text-[14px] font-medium py-12 px-[18px] ml-auto`}
        >
          <span className="mr-4">Tin nhắn</span>
          <HiOutlineChatBubbleBottomCenterText />
        </button>
      </div>
    </div>
  )
}
