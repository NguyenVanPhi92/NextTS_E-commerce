import { InputSearch, Spinner } from "@/components"
import { RootState } from "@/core/store"
import { RoomFunctionHandler, RoomRes } from "@/models"
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useSelector } from "react-redux"
import { useRoom } from "shared/hook/chat"
import { RoomItem } from "./roomItem"
import { RoomSearch } from "./roomSearch"

export type OnForwaredRoomDetail = ForwardedRef<RoomFunctionHandler>

interface RoomProps {
  onSelectRoom?: (room: RoomRes) => void
}

export const Room = forwardRef(function RoomChild(
  { onSelectRoom }: RoomProps,
  ref: OnForwaredRoomDetail
) {
  const roomId = useSelector((state: RootState) => state.chat.currentRoomId) as string
  const [showSearch, setShowSearch] = useState<boolean>()

  const {
    data,
    hasMore,
    addRoom,
    isFetchingMore,
    isFirstLoading,
    fetchMoreRooms,
    appendLastMessage,
    changeStatusOfRoom,
    messageUnreadhandler,
    clearMessagesUnreadFromRoom,
    deleteRoomByCompoundingCarId,
    changeOrderAndAppendLastMessage,
    deleteRoom,
  } = useRoom(roomId)

  useImperativeHandle(ref, () => ({
    messageUnreadhandler: messageUnreadhandler,
    changeStatusOfRoom: changeStatusOfRoom,
    changeOrderAndAppendLastMessage: changeOrderAndAppendLastMessage,
    appendLastMessage: appendLastMessage,
    clearMessagesUnreadFromRoom: clearMessagesUnreadFromRoom,
    addRoom: addRoom,
    deleteRoomByCompoundingCarId: deleteRoomByCompoundingCarId,
    deleteRoom: deleteRoom,
  }))

  return (
    <div className="h-full flex-1 flex flex-col relative">
      {showSearch ? (
        <div className="bg-white-color z-10 flex flex-col flex-1 chat-room-search">
          <RoomSearch
            currentRoomSelected={roomId}
            onSelectRoom={onSelectRoom}
            onClose={() => setShowSearch(false)}
            onOpen={() => setShowSearch(true)}
          />
        </div>
      ) : (
        <>
          <div className="h-[48px] mb-12 md:mb-16 lg:mb-24 chat-room-search-form">
            <InputSearch
              attributes={{ placeholder: "Tìm kiếm" }}
              onFocus={() => setShowSearch(true)}
            />
          </div>

          {isFirstLoading ? (
            <>
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
            </>
          ) : data && data?.data?.length > 0 ? (
            <div className="flex-1 flex flex-col chat-room-list">
              <div className="flex-1 overflow-y-auto" id="scrollableDiv">
                <InfiniteScroll
                  scrollableTarget="scrollableDiv"
                  loader={isFetchingMore ? <Spinner /> : null}
                  hasMore={hasMore}
                  next={() => fetchMoreRooms()}
                  dataLength={data?.data?.length}
                >
                  {data.data.map((item) => (
                    <RoomItem
                      className="last:mb-12"
                      isActive={item.room_id === roomId}
                      onSelectRoom={onSelectRoom}
                      key={item.room_id}
                      data={item}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
})
