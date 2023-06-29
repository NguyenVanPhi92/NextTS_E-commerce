import { store } from "@/core/store";
import { GetBannerParams, GetProductDetail, Product, ProductCombo, ProductParams } from "@/models";
import { AxiosResponse, AxiosResponse2 } from "axios";
import axiosClient from ".";

const productApi = {
	getCategories: (parent_id: number | false = false) => {
		return axiosClient.post("/api/v2.0/product/category", {
			params: {
				parent_id,
			},
		});
	},

	getChildCategories: (parent_id: number | false = false) => {
		return axiosClient.post("/api/v3.0/product/category", {
			params: {
				parent_id,
			},
		});
	},

	getProductDetail: (params: GetProductDetail) => {
		return axiosClient.post("/api/v2.0/product_product/detail", {
			params,
		});
	},

	getProductList: (params?: ProductParams): Promise<AxiosResponse<{ products: Product[] }>> => {
		return axiosClient.post("/api/v3.0/product/get_product", {
			params: {
				...params,
				partner_id: store?.getState()?.user?.userInfo?.id || 0,
			},
		});
	},

	getProductCombo: (params?: ProductParams): Promise<AxiosResponse2<ProductCombo[]>> => {
		return axiosClient.post("/api/v2.0/product/top", {
			params: {
				...params,
				partner_id: store?.getState()?.user?.userInfo?.id || 0,
			},
		});
	},

	getProductComboDetail: (
		params?: GetProductDetail
	): Promise<AxiosResponse<{ detail: ProductCombo[] }>> => {
		return axiosClient.post("/api/v2.0/product_product/detail", {
			params,
		});
	},

	getProductAttributeList: (categ_id: number) => {
		return axiosClient.post("/attribute_controller/get_product_attribute_list", {
			params: {
				categ_id,
			},
		});
	},

	getSaleProductList: () => {
		return axiosClient.post("/daily_deal_controller/get_daily_deal", {
			params: {},
		});
	},

	filterProducts: (params?: ProductParams) => {
		return axiosClient.post("/attribute_controller/search_product_by_attribute", {
			params,
		});
	},

	getBanners: (params?: GetBannerParams) => {
		return axiosClient.post("/api/v3.0/interface/get_image", {
			params,
		});
	},
};

export default productApi;
