import {
	AddComment,
	AddressAdd,
	AddressDelete,
	Auth,
	ChangePasswordProps,
	DeleteComment,
	DistrictId,
	GetComment,
	GetPromotionList,
	ILogin,
	OrderHistoryDetail,
	PhoneUpdateProps,
	ResetPassword,
	SaleOrderId,
	StateId,
	UpdateUserProps,
	WishlistReq,
} from "@/models";
import { AxiosResponse } from "axios";
import axiosClient from ".";

const userApi = {
	login: (params: ILogin) => {
		return axiosClient.post("/api/v2.0/user/login", { params });
	},

	checkPassword: () => {
		return axiosClient.post("/api/v2.0/user/check-password", { params: {} });
	},

	changePassword: (params: ChangePasswordProps) => {
		return axiosClient.post("/api/v2.0/user/change-password", { params });
	},

	resetPassword: (params: ResetPassword) => {
		return axiosClient.post("/api/v2.0/user/reset-password", { params });
	},

	getUserInfo: (token?: string) => {
		return axiosClient.post("/api/v2.0/user/account/info", { params: { token } });
	},

	updateUser: (address: UpdateUserProps) => {
		return axiosClient.post("/api/v2.0/information_customers/update_user", {
			params: address,
		});
	},

	checkPhoneExist: (phone: string) => {
		return axiosClient.post("/api/v2.0/user/check_phone", {
			params: {
				phone,
			},
		});
	},

	getAddress: (params: StateId | DistrictId | {}) => {
		return axiosClient.post("/api/v2.0/user/adress", {
			params,
		});
	},

	getAddressByUser: () => {
		return axiosClient.post("/api/v2.0/user/get_adress_by_partner", { params: {} });
	},

	deleteAddress: (params: AddressDelete) => {
		return axiosClient.post("/api/v2.0/user/adress_delete", {
			params,
		});
	},

	addAddress: (address: AddressAdd) => {
		return axiosClient.post("/api/v2.0/user/adress_add", { params: address });
	},

	firebaseAuth: (params: Auth) => {
		return axiosClient.post("/api/v2.0/information_customers/auth", {
			params,
		});
	},

	updatePhoneNumber: (params: PhoneUpdateProps) => {
		return axiosClient.post("/api/v2.0/update_phone_by_login", {
			params,
		});
	},

	getDetailUser: () => {
		return axiosClient.post("/api/v2.0/information_customers/get_info_customer", { params: {} });
	},

	getOrderListHistory: (params: { limit?: number; offset?: number }) => {
		return axiosClient.post("/api/v2.0/information_booking/booking_history", {
			params: params,
		});
	},

	getDetailOrderHistory: (params: SaleOrderId): Promise<AxiosResponse<OrderHistoryDetail>> => {
		return axiosClient.post("/api/v2.0/information_booking/get_info_booking", {
			params: params,
		});
	},

	getWishlists: () => {
		return axiosClient.post("/api/v2.0/get_wishlist", { params: {} });
	},

	addWishlist: (params: WishlistReq) => {
		return axiosClient.post("/api/v2.0/add_wishlist", {
			params: params,
		});
	},

	deleteWishlist: (params: WishlistReq) => {
		return axiosClient.post("/api/v2.0/delete_wishlist", {
			params: params,
		});
	},

	addReview: (params: AddComment) => {
		return axiosClient.post("/api/v2.0/add_comment_product", {
			params: params,
		});
	},

	getReviews: (params: GetComment) => {
		return axiosClient.post("/api/v2.0/get_comment_product", {
			params: params,
		});
	},

	getChatToken: (): Promise<AxiosResponse<{ chat_access_token: string }>> => {
		return axiosClient.get("/api/get_chat_token");
	},

	deleteReview: (params: DeleteComment) => {
		return axiosClient.post("/api/v2.0/delete_comment_product", {
			params: params,
		});
	},

	getNotifications: (params: DeleteComment) => {
		return axiosClient.post("/api/get_notifications", {
			params: params,
		});
	},

	checkNotifications: (params: DeleteComment) => {
		return axiosClient.post("/api/get_notifications", {
			params: params,
		});
	},
};

export default userApi;
