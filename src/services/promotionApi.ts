import {
  CheckPromotionReq,
  Promotion,
  PromotionDetail,
  PromotionDetailReq,
  PromotionReq,
  SavePromotionReq,
  SearchPromotionReq,
  GetValuePromotionReq,
  TokenAndSaleOrderId,
  ApplyPromotionRes,
} from "@/models"

import { AxiosPromise, AxiosResponse } from "axios"
import axiosClient from "."

const promotionApi = {
  // Lấy những chiến dịch khuyên mại đang được chạy
  getSpecialPromotions: () => {
    return axiosClient.post("/promotion_api/get_special_promotion", { params: {} })
  },

  //Lấy chi tiết chương trình khuyến mại
  getPromotionDetail: (
    params: PromotionDetailReq
  ): AxiosPromise<AxiosResponse<PromotionDetail>> => {
    return axiosClient.post("/promotion_api/get_detail_promotion", { params })
  },

  //Tìm chương trình khuyến mại theo mã COUPON_CODE
  searchPromotion: (params: SearchPromotionReq): AxiosPromise<AxiosResponse<PromotionDetail>> => {
    return axiosClient.post("/promotion_api/search_promotion", { params })
  },

  //Lưu chương trình khuyến mại vào kho voucher của bản thân
  savePromotion: (params: SavePromotionReq) => {
    return axiosClient.post("/promotion_api/save_promotion", { params })
  },

  //Danh sách khuyến mại của bản thân đã được lưu trong kho VOUCHER
  getOwnPromotions: (params: PromotionReq) => {
    return axiosClient.post("/promotion_api/get_list_my_promotion", { params })
  },

  //Lấy danh sách những chương trình khuyến mại mới. Nhưng chương trình khuyến mại chưa lưu vào kho VOUCHER
  getNewPromotions: (params: PromotionReq) => {
    return axiosClient.post("/promotion_api/get_list_new_promotion", { params })
  },

  //Kiểm tra danh sách những chương trình khuyến mại đã lưu trong kho VOURCHER có thể được áp dụng cho đơn hàng này
  getPromotionList: (params: CheckPromotionReq) => {
    return axiosClient.post("/promotion_api/get_list_promotion_can_apply", { params })
  },

  //Lấy giá trị khuyến mại sẽ được áp dụng cho danh sách hàng hóa có trong giỏ hàng
  getPromotionValue: (params: GetValuePromotionReq) => {
    return axiosClient.post("/promotion_api/get_value_promotion", { params })
  },

  //Xác nhận tạo đơn hàng. Nếu đã có id trước đó
  confirmCreateSale: (params: TokenAndSaleOrderId) => {
    return axiosClient.post("/promotion_api/confirm_create_sale", { params })
  },

  //áp dụng chương trình khuyến mại cho đơn hàng
  applyPromotion: (params: PromotionReq): AxiosPromise<AxiosResponse<ApplyPromotionRes>> => {
    return axiosClient.post("/promotion_api/apply_promotion", { params })
  },

  //Hủy áp dụng chương trình khuyến mại
  cancelApplyPromotion: (params: TokenAndSaleOrderId) => {
    return axiosClient.post("/promotion_api/cancel_promotion", { params })
  },
}

export default promotionApi
