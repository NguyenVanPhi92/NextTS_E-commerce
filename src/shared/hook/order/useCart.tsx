import { RootState } from "@/core/index";
import {
	convertComboDetailToCartItem,
	convertProductToCartItem,
	getTotalPrice,
} from "@/helper";
import {
	CartItem,
	Product,
	ProductCombo,
	ProductComboDetail,
	Variant,
} from "@/models";
import {
	addProductItem,
	clearProductList,
	deleteProductItem,
	replaceProductItem,
	selectOrderProductList,
} from "@/modules";
import productApi from "@/services/productApi";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "reapop";

const useCart = () => {
	const dispatch = useDispatch();
	const productList = useSelector(selectOrderProductList);
	const { userInfo } = useSelector((state: RootState) => state.user);
	const token = useSelector((state: RootState) => state.user.token);
	const [isAddingToCart, setIsAddingToCart] = useState<number | undefined>();
	const router = useRouter();

	const addProductToCart = (
		product: Product,
		quantity: number,
		variant: Variant[] | [],
		type: "cart" | "buy"
	) => {
		if (!token) {
			router.push("/login");
			return;
		}

		const productExist = getCartItemInProductList(product.id_product_att);

		dispatch(
			addProductItem(
				convertProductToCartItem({ product, quantity, variant, type })
			)
		);

		dispatch(
			notify(
				!productExist
					? "Thêm giỏ hàng thành công!"
					: "Cập nhật giỏ hàng thành công!",
				"success"
			)
		);
	};

	// call api to get combo detail
	const addComboToCart = (
		combo: ProductCombo,
		quantity: number,
		type: "cart" | "buy"
	) => {
		if (!token) {
			router.push("/login");
			return;
		}

		const comboExist = getCartItemInProductList(combo.id);

		setIsAddingToCart(combo.id);

		productApi
			.getProductComboDetail({
				partner_id: userInfo?.id,
				list_products: [],
				product_id: combo.id || 0,
				type: "combo",
			})
			.then((res: any) => {
				const comboDetail: ProductComboDetail = res?.result?.data?.detail;
				dispatch(
					addProductItem(
						convertComboDetailToCartItem({ comboDetail, quantity, type })
					)
				);
				setIsAddingToCart(undefined);
				dispatch(
					notify(
						!comboExist
							? "Thêm giỏ hàng thành công!"
							: "Cập nhật giỏ hàng thành công!",
						"success"
					)
				);
			})
			.catch((error) => {
				setIsAddingToCart(undefined);
				console.log(error);
			});
	};

	const addComboDetailToCart = (
		comboDetail: ProductComboDetail,
		quantity: number,
		type: "cart" | "buy"
	) => {
		if (!token) {
			router.push("/login");
			return;
		}
		const comboExist = getCartItemInProductList(comboDetail.id);
		dispatch(
			addProductItem(
				convertComboDetailToCartItem({ comboDetail, quantity, type })
			)
		);
		dispatch(
			notify(
				!comboExist
					? "Thêm giỏ hàng thành công!"
					: "Cập nhật giỏ hàng thành công!",
				"success"
			)
		);
	};

	const getTotalCartPrice = () => {
		return getTotalPrice(productList);
	};

	const getCartItemInProductList = (product_id: number) =>
		productList.find((item) => item.product_id === product_id);

	const changeCartItemVariant = (
		currentVariant: CartItem,
		newVariant: CartItem
	) => {
		dispatch(
			replaceProductItem({
				current_variant_id: currentVariant.product_id,
				newVariant,
			})
		);
	};

	const deleteCartItem = (cartItem: CartItem) => {
		const cartItemExist = getCartItemInProductList(cartItem.product_id);
		if (cartItemExist) {
			dispatch(deleteProductItem(cartItem));
		}
	};

	const clearCart = () => {
		dispatch(clearProductList());
	};

	return {
		cartLength: productList?.length || 0,
		getTotalCartPrice,
		addProductToCart,
		addComboToCart,
		deleteCartItem,
		clearCart,
		getCartItemInProductList,
		changeCartItemVariant,
		addComboDetailToCart,
		isAddingToCart,
	};
};

export { useCart };
