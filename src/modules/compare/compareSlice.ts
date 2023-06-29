import { Product, ProductCombo, PayloadType } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

interface ProductCompare {
	productsCompare: Product[] | ProductCombo[];
	isShowCompareModal: boolean;
}

const initialState: ProductCompare = {
	productsCompare: [],
	isShowCompareModal: false,
};

const compareSlice = createSlice({
	name: "compare",
	initialState,
	reducers: {
		deleteProductCompare: (state, { payload }) => {
			if ((payload as Product)?.id) {
				state.productsCompare = (state.productsCompare as Product[]).filter(
					(product) => (product as Product).id !== (payload as Product).id
				);
			} else {
				state.productsCompare = (
					state.productsCompare as ProductCombo[]
				).filter(
					(product) =>
						(product as ProductCombo).id !== (payload as ProductCombo).id
				);
			}
		},

		clearProductCompare: (state) => {
			state.productsCompare = [];
		},

		addProductCompare: (state, { payload }) => {
			let isExist;
			if ((payload as ProductCombo)?.type === "combo") {
				isExist = (state.productsCompare as ProductCombo[]).find(
					(item) => item.id === (payload as ProductCombo).id
				);
			} else {
				isExist = (state.productsCompare as Product[]).find(
					(item) => item.id === (payload as Product).id
				);
			}

			if (isExist) return;
			state.productsCompare.unshift(payload);
		},

		toggleShowCompareModal: (state, { payload }) => {
			state.isShowCompareModal = payload;
		},
	},
});

export default compareSlice.reducer;

export const {
	addProductCompare,
	deleteProductCompare,
	toggleShowCompareModal,
	clearProductCompare,
} = compareSlice.actions;
