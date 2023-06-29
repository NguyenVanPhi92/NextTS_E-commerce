import { store } from "@/core/store";
import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
	baseURL: API_URL,
	method: "POST",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(async (config) => {
	const token = store?.getState()?.user?.token || store?.getState()?.auth?.currentToken;
	if (token) {
		config.data.params.token = token;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response?.data) {
			return response.data;
		}
		return response;
	},
	(err) => {
		throw err;
	}
);

export default axiosClient;
// export * from "./cartApi"
// export * from "./chatApi"
// export * from "./notificationApi"
// export * from "./productApi"
// export * from "./ratingApi"
// export * from "./userApi"
