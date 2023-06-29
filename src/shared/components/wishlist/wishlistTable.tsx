/* eslint-disable @next/next/no-img-element */
import { cartEmptyIcon } from "@/assets";
import { RootState } from "@/core/index";
import { isArrayHasValue } from "@/helper";
import { MainLayout } from "@/layout";
import { Wishlist } from "@/models";
import { setOpenModalConfirm } from "@/modules";
import userApi from "@/services/userApi";
import produce from "immer";
import Link from "next/link";
import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useQueryList, useWishlist } from "shared/hook";
import { Spinner } from "../common";
import { ModalConfirm } from "../modal";
import { WishlistRow } from "./wishlistRow";

export const WishlistTable = () => {
	const dispatch = useDispatch();
	const [currentWishlist, setCurrentWishlist] = useState<Wishlist | undefined>();

	const { token } = useSelector((state: RootState) => state.user);
	const {
		data: wishlists,
		isValidating,
		fetchMore,
		hasMore,
		mutate,
	} = useQueryList<Wishlist, any>({
		key: "get_wishlist",
		fetcher: userApi.getWishlists,
		initialParams: { token, limit: 12 },
	});

	const handleDelete = (id: number) => {
		if (!wishlists?.length) return;
		try {
			userApi.deleteWishlist({ wishlist_id: id }).then((res) => {
				mutate(
					produce(wishlists, (draft) => {
						const index = wishlists.findIndex((item) => item.id === id);
						if (index !== -1) {
							draft.splice(index, 1);
						}
					}),
					false
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleFetchMore = () => {
		fetchMore({ params: {} });
	};

	const handleDeleteWishlist = (product: Wishlist) => {
		setCurrentWishlist(product);
		dispatch(
			setOpenModalConfirm({
				isOpen: true,
				title: "Bạn có chắc muốn xóa sản phẩm khỏi danh sách yêu thích?",
			})
		);
	};

	if (!token || (!isValidating && !isArrayHasValue(wishlists)))
		return (
			<div className="flex flex-col items-center bg-white p-8">
				<p className="mb-8 text-sm">Danh sách yêu thích của bạn đang trống</p>

				{cartEmptyIcon}
				<Link passHref href="/">
					<a className="btn-primary mt-8">Tiếp tục mua sắm</a>
				</Link>
			</div>
		);
	return (
		<>
			{isValidating ? (
				<div className="loader-container">
					<RiLoader4Line className="loader" />
				</div>
			) : (
				<div>
					{wishlists?.length > 0 ? (
						<InfiniteScroll
							dataLength={4}
							next={handleFetchMore}
							hasMore={hasMore}
							loader={hasMore ? <Spinner /> : null}
						>
							{wishlists?.map((item) => (
								<WishlistRow
									key={item.id}
									data={item}
									onDelete={(data) => handleDeleteWishlist(data)}
								/>
							))}
						</InfiniteScroll>
					) : null}
				</div>
			)}

			{currentWishlist?.product_id ? (
				<ModalConfirm
					onConfirm={() => {
						handleDelete(currentWishlist.id);
						setCurrentWishlist(undefined);
						dispatch(setOpenModalConfirm({ isOpen: false, title: "" }));
					}}
				/>
			) : null}
		</>
	);
};

WishlistTable.Layout = MainLayout;
