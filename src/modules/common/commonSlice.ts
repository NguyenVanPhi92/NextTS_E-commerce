import {
  BooleanType,
  BreadcrumbItem,
  CommonSlice,
  ModalConfirmProps,
  ShippingAddress,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: CommonSlice = {
  isOpenModalProduct: false,
  isOpenModalProductCombo: false,
  isOpenModalOptionAccount: false,
  isOpenModalCoupons: false,
  modalConfirm: {
    isOpen: false,
    title: "",
    heading: "",
  },
  isOpenAddressForm: false,
  isChannelGroupOpen: false,
  isOpenModalFilter: false,
  isOpenNavLeftModal: false,
  currentReviewId: 0,
  addressForm: undefined,
  breadcrumbList: undefined,
  isOpenCategoryModal: false,
  isOpenSearchModal: false,
  isOpenCartModal: false,
  isOpenScreenLoading: false,
  isOpenOrderSummary: false,
  isOpenOtpLoginModal: false,
  isOpenLoginSMSModal: false,
  isOpenLoginModal: false,
  previewImageUrl: undefined,
}

const ModalSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setOpenModalProduct: (state, { payload }: BooleanType) => {
      state.isOpenModalProduct = payload
    },

    setOpenModalProductCombo: (state, { payload }: BooleanType) => {
      state.isOpenModalProductCombo = payload
    },

    setOpenModalAccountOption: (state, { payload }: BooleanType) => {
      state.isOpenModalOptionAccount = payload
    },

    setOpenModalConfirm: (state, { payload }: { payload: ModalConfirmProps | undefined }) => {
      if (!payload) {
        state.modalConfirm.heading = ""
        state.modalConfirm.title = ""
        state.modalConfirm.isOpen = false
      } else {
        state.modalConfirm = payload
      }
    },

    setOpenModalAddressForm: (state, { payload }: BooleanType) => {
      state.isOpenAddressForm = payload
    },

    setOpenChannelGroup: (state, { payload }: BooleanType) => {
      state.isChannelGroupOpen = payload
    },

    setOpenCategoryModal: (state, { payload }: BooleanType) => {
      state.isOpenCategoryModal = payload
    },
    setOpenSearchModal: (state, { payload }: BooleanType) => {
      state.isOpenSearchModal = payload
    },

    setCurrentReviewId: (state, { payload }: { payload: number }) => {
      state.currentReviewId = payload
    },

    setAddressForm: (state, { payload }: { payload: ShippingAddress | undefined }) => {
      state.addressForm = payload
    },

    setBreadcrumbList: (state, { payload }: { payload: BreadcrumbItem[] | undefined }) => {
      state.breadcrumbList = payload
    },

    setOpenModalFilter: (state, { payload }: { payload: boolean }) => {
      state.isOpenModalFilter = payload
    },

    setOpenCartModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenCartModal = payload
    },

    setOpenNavLeftModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenNavLeftModal = payload
    },

    setOpenScreenLoading: (state, { payload }: { payload: boolean }) => {
      state.isOpenScreenLoading = payload
    },

    setOpenOrderSummaryModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenOrderSummary = payload
    },

    setOpenOtpLoginModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenOtpLoginModal = payload
    },

    setOpenLoginSMSModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenLoginSMSModal = payload
    },

    setOpenLoginModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenLoginModal = payload
    },

    setPreviewImageUrl: (state, { payload }: { payload: string | undefined }) => {
      state.previewImageUrl = payload
    },
  },
})

export default ModalSlice.reducer

export const {
  setOpenModalAccountOption,
  setOpenModalAddressForm,
  setOpenModalProductCombo,
  setOpenModalConfirm,
  setOpenModalProduct,
  setOpenChannelGroup,
  setAddressForm,
  setCurrentReviewId,
  setBreadcrumbList,
  setOpenModalFilter,
  setOpenCategoryModal,
  setOpenSearchModal,
  setOpenCartModal,
  setOpenNavLeftModal,
  setOpenScreenLoading,
  setOpenOrderSummaryModal,
  setOpenOtpLoginModal,
  setOpenLoginSMSModal,
  setOpenLoginModal,
  setPreviewImageUrl,
} = ModalSlice.actions
