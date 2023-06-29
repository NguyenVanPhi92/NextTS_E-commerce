import { InputSearch, Spinner } from "@/components";
import { RootState } from "@/core/store";
import { ListRes, RoomRes } from "@/models";
import { addRoomHistory, deleteRoomHistory } from "@/modules";
import { chatApi } from "@/services/chatApi";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useQueryList } from "shared/hook";
import { RoomItem } from "./roomItem";

interface RoomSearchProps {
	onOpen?: Function;
	onClose?: Function;
	onSelectRoom?: (_: RoomRes) => void;
	currentRoomSelected?: string;
}

export const RoomSearch = ({
	onClose,
	onOpen,
	onSelectRoom,
	currentRoomSelected,
}: RoomSearchProps) => {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState<string>();
	const roomHistory = useSelector((state: RootState) => state.roomHistory.data);
	// const { data, isValidating, filter, offset } = useQueryList<ListRes<RoomRes[], any>>({
	//   initialData: undefined,
	//   fetcher: chatApi.getRoomList,
	//   key: "get_room_list_search",
	// })

	useEffect(() => {
		(document.querySelector(".room-search-input .form-input") as HTMLInputElement)?.focus();
	}, []);

	return (
		<>
			{/* <div className="h-[48px] flex items-center room-search-form">
        <InputSearch
          className="room-search-input"
          onFocus={() => onOpen?.()}
          onChange={(search_term) => {
            setSearchTerm(search_term)
            if (search_term) {
              filterList(chatApi.getRoomList({ offset, search_term }))
            }
          }}
          attributes={{ placeholder: "Tìm kiếm" }}
        />

        <button
          onClick={() => onClose?.()}
          className="px-4 py-2 lg:px-8 lg:py-4 hover:bg-bg text-xs lg:text-sm font-semibold rounded-[5px] ml-12"
        >
          Đóng
        </button>
      </div> */}

			{/* <div className="mt-24 flex-1 flex flex-col chat-room-search-list">
        {searchTerm ? (
          isValidating ? (
            <>
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
              <RoomItem data={null} />
            </>
          ) : (
            <>
              {data?.data?.length ? (
                <div id="scrollbarRoomSearch" className="overflow-y-auto flex-1">
                  <p className="text-sm font-semibold mb-16 room-search-list-title">
                    Kết quả tìm kiếm ({data.total})
                  </p>

                  <InfiniteScroll
                    scrollableTarget="scrollbarRoomSearch"
                    className="mt-16"
                    hasMore={data?.has_more}
                    dataLength={data.data.length}
                    loader={<Spinner />}
                    next={() => {}}
                  >
                    {data.data.map((item) => (
                      <RoomItem
                        isActive={currentRoomSelected === item.room_id}
                        type="search"
                        data={item}
                        onSelectRoom={(val) => {
                          onSelectRoom?.(val)
                          if (!roomHistory?.some((item) => item.room_id === val.room_id)) {
                            dispatch(addRoomHistory(item))
                          }
                          console.log(val)
                        }}
                        key={item.room_id}
                      />
                    ))}
                  </InfiniteScroll>
                </div>
              ) : (
                <div className="flex-center flex-col mt-40 text-sm font-semibold text-gray-color-4">
                  <p className="mb-4">Không có kết quả</p>
                  <p className="">Vui lòng thử lại từ khóa khác</p>
                </div>
              )}
            </>
          )
        ) : (
          <div className="overflow-y-auto flex-1">
            <p className="text-sm font-semibold mb-16 room-search-list-title">Tìm gần đây</p>
            {roomHistory.map((item) => (
              <RoomItem
                isActive={currentRoomSelected === item.room_id}
                onDeleteHistory={({ room_id }) => dispatch(deleteRoomHistory(room_id))}
                type="history"
                data={item}
                onSelectRoom={(val) => {
                  onSelectRoom?.(val)
                }}
                key={item.room_id}
              />
            ))}
          </div>
        )}
      </div> */}
		</>
	);
};
