import { RootState } from "@/core/index";
import { Product, ProductSlice } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

let initialState: ProductSlice = {
	product: undefined,
	listAttribute: undefined,
	viewedProducts: [],
};

try {
	const viewedProducts = sessionStorage?.getItem("viewedProducts");
	initialState = {
		...initialState,
		viewedProducts: viewedProducts ? JSON.parse(viewedProducts) : [],
	};
} catch (error) {}

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProduct: (state, { payload }: { payload: Product | undefined }) => {
			state.product = payload;
		},

		addViewedProduct: (state, { payload }: { payload: Product }) => {
			const index = state?.viewedProducts?.findIndex(
				(item) => item.id === payload?.id
			);
			if (index !== -1) {
				state.viewedProducts = state.viewedProducts.filter(
					(item) => item.id !== payload.id
				);
			}

			state.viewedProducts.unshift(payload);

			if (state.viewedProducts?.length > 12) {
				state.viewedProducts = state.viewedProducts.filter(
					(item) => item.id !== state.viewedProducts[12].id
				);
			}
		},
	},
});

export const selectViewedProducts = (state: RootState) =>
	state.product.viewedProducts;

export default productSlice.reducer;

export const { setProduct, addViewedProduct } = productSlice.actions;
