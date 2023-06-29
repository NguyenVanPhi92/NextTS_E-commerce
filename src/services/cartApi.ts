import { CartRes } from "@/models";
import { AxiosResponse } from "axios";
import axiosClient from ".";

export interface AddToCartProps {
  product_id: number;
  uom_id?: number;
  product_qty?: number;
  offer_pricelist?: number | false;
  company_id?: number;
}

export interface DeleteCartProps {
  stored_product_ids: number[];
}

export interface UpdateCartProps {
  product_qty: number;
  stored_product_id: number;
}

const cartApi = {
  getCartList: (): Promise<AxiosResponse<CartRes[]>> => {
    return axiosClient.post(
      "/stored_product_controller/list_stored_product_in_bag",
      { params: {} }
    );
  },

  addToCart: (params: AddToCartProps) => {
    return axiosClient.post(
      "/stored_product_controller/create_stored_product_into_bag",
      {
        params,
      }
    );
  },

  updateCartItem: (params: UpdateCartProps) => {
    return axiosClient.post(
      "/stored_product_controller/update_stored_product_in_bag",
      {
        params,
      }
    );
  },

  deleteFromCart: (params: DeleteCartProps) => {
    return axiosClient.post(
      "/stored_product_controller/delete_stored_product_in_bag",
      {
        params,
      }
    );
  },
};

export default cartApi;
