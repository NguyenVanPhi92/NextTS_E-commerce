import { RootState } from "@/core/store";
import { DeleteWishlistHook, Product, ProductDetail, Wishlist } from "@/models";
import userApi from "@/services/userApi";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";

interface WishlistSWR {
	data: Wishlist[] | undefined;
	error: any;
	isValidating: boolean;
	isFetching: boolean;
	deleteWishlist: (_: DeleteWishlistHook, handleSuccess?: Function, handleError?: Function) => void;
	addWishlist: (_: DeleteWishlistHook, handleSuccess?: Function, handleError?: Function) => void;
}

const useWishlist = (shoudFetch = false): WishlistSWR => {
	const router = useRouter();
	const { cache, mutate: mutateProduct } = useSWRConfig();
	const { token } = useSelector((state: RootState) => state.user);
	const [isFetching, setFetching] = useState<boolean>(false);

	const { data, error, isValidating, mutate } = useSWR<Wishlist[] | undefined>(
		"wishlist",
		shoudFetch && token ? () => userApi.getWishlists().then((res: any) => res?.result) : null
	);

	const addWishlist = async (
		{ shouldMutateProduct = true, product }: DeleteWishlistHook,
		handleSuccess?: Function,
		handleError?: Function
	) => {
		if (!token) {
			router.push("/login");
			return;
		}

		const wishlist = getWishlist(product);

		if (wishlist) return;

		try {
			setFetching(true);
			const res: any = await userApi.addWishlist({
				product_id: (product as ProductDetail).product_tmpl_id,
			});
			console.log("added wl");
			setFetching(false);
			if (res?.result?.id) {
				handleSuccess?.();
				shouldMutateProduct &&
					mutateProductDetail?.(
						true,
						(product as Product).id || (product as Wishlist).id_product_att
					);

				mutate([...(data || []), res.result], false);
			} else {
				handleError?.();
			}
		} catch (error) {
			handleError?.();
			setFetching(false);
		}
	};

	const deleteWishlist = async (
		{ product, shouldMutateProduct = true }: DeleteWishlistHook,
		handleSuccess?: Function,
		handleError?: Function
	) => {
		if (!token) {
			router.push("/login");
			return;
		}

		try {
			setFetching(true);
			const res: any = await userApi.deleteWishlist({
				product_id: (product as ProductDetail).product_tmpl_id || (product as Wishlist).product_id,
			});
			console.log("deleted wl");

			setFetching(false);
			if (res?.result?.[0]) {
				handleSuccess?.();
				shouldMutateProduct &&
					mutateProductDetail?.(
						false,
						(product as Product).id || (product as Wishlist).id_product_att
					);
				mutate(
					[...(data || [])].filter(
						(item) => item.product_id !== (product as ProductDetail).product_tmpl_id
					),
					false
				);
			} else {
				handleError?.();
			}
		} catch (error) {
			handleError?.();
			setFetching(false);
		}
	};

	const getWishlist = (product: ProductDetail | Wishlist): Wishlist | undefined => {
		if (!data?.length) return undefined;
		return data?.find(
			(item) =>
				item.product_id ===
				((product as ProductDetail).product_tmpl_id || (product as Wishlist)?.product_id)
		);
	};

	const mutateProductDetail = (wishlist: boolean, product_id: number) => {
		const key = `get_product_detail_${product_id}`;
		const productDetail: ProductDetail | null = cache.get(key); //problem here -> variant: undefined
		console.log("mutate wl: ", wishlist);
		console.log("mutate productdetail: ", productDetail);

		mutateProduct(
			key,
			{
				...productDetail,
				wishlist: wishlist,
			} as ProductDetail,
			false
		);
		// if (productDetail?.id_product_att) {
		// 	console.log("mutate");

		// 	mutateProduct(
		// 		key,
		// 		{
		// 			...productDetail,
		// 			wishlist: wishlist,
		// 		} as ProductDetail,
		// 		false
		// 	);
		// } else {
		// 	console.log("mutate key");
		// 	mutateProduct(key);
		// }
	};

	return {
		data,
		error,
		isValidating,
		deleteWishlist,
		isFetching,
		addWishlist,
	};
};

export { useWishlist };
