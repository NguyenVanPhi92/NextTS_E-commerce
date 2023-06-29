import { Header, HeaderMobile, Seo } from "@/components"
import { Chat } from "@/components/chat"
import { MainAuthLayoutNoFooter } from "@/layout"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const ChatPage = () => {
  const roomId = useSelector((state: RootState) => state.chat.currentRoomId)

  return (
    <main className="bg-bg flex flex-col h-full py-16">
      <section className="container">
        <Seo title="Chat" url="chat" description="" thumbnailUrl="" />
        <HeaderMobile centerChild={<p>Tin nhắn</p>} />
        <div
          className={`chat-page min-h-[calc(100vh-92px)] lg:min-h-[calc(100vh-144px)] ${
            roomId ? "" : ""
          } flex-1 flex flex-col h-full`}
        >
          <Chat />
        </div>
      </section>
    </main>
  )
}

ChatPage.Layout = MainAuthLayoutNoFooter
export default ChatPage
