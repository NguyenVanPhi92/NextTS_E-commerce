import { ProductCombo, ProductComboSlice } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

let initialState: ProductComboSlice = {
	combo: undefined,
	viewedCombos: [],
};

try {
	const viewedCombos = sessionStorage?.getItem("viewedCombos");
	initialState = {
		...initialState,
		viewedCombos: viewedCombos ? JSON.parse(viewedCombos) : [],
	};
} catch (error) {}

const productComboSlice = createSlice({
	name: "combo",
	initialState,
	reducers: {
		setProductCombo: (
			state,
			{ payload }: { payload: ProductCombo | undefined }
		) => {
			state.combo = payload;
		},

		addViewedProductCombo: (state, { payload }: { payload: ProductCombo }) => {
			const index = state?.viewedCombos?.findIndex(
				(item) => item.id === payload?.id
			);
			if (index !== -1) {
				state.viewedCombos = state.viewedCombos.filter(
					(item) => item.id !== payload.id
				);
			}

			state.viewedCombos.unshift(payload);

			if (state.viewedCombos?.length > 12) {
				state.viewedCombos = state.viewedCombos.filter(
					(item) => item.id !== state.viewedCombos[12].id
				);
			}
		},
	},
});

export default productComboSlice.reducer;

export const { setProductCombo, addViewedProductCombo } =
	productComboSlice.actions;
