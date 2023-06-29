import { combineReducers } from "@reduxjs/toolkit";
import { reducer as notificationsReducer } from "reapop";
import authSlice from "./auth/authSlice";
import chatSlice from "./chat/chatSlice";
import roomHistorySlice from "./chat/roomHistorySlice";
import productComboSlice from "./productCombo/productComboSlice";
import commonSlice from "./common/commonSlice";
import compareSlice from "./compare/compareSlice";
import orderSlice from "./order/orderSlice";
import productSlice from "./product/productSlice";
import searchProductHistorySlice from "./product/searchProductHistorySlice";
import userSlice from "./user/userSlice";

const rootReducer = combineReducers({
	compare: compareSlice,
	common: commonSlice,
	user: userSlice,
	order: orderSlice,
	product: productSlice,
	combo: productComboSlice,
	auth: authSlice,
	chat: chatSlice,
	notifications: notificationsReducer(),
	searchProductHistory: searchProductHistorySlice,
	roomHistory: roomHistorySlice,
});

export default rootReducer;

export * from "./chat";
export * from "./common/commonSlice";
export * from "./compare/compareSlice";
export * from "./order/orderSlice";
export * from "./product/productSlice";
export * from "./productCombo/productComboSlice";
export * from "./product/searchProductHistorySlice";
export * from "./user/userSlice";
export * from "./auth/authSlice";
