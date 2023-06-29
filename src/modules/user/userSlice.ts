import { RootState } from "@/core/store";
import {
  PayloadType,
  ShippingAddress,
  UserEdit,
  UserInfo,
  UserSlice,
} from "@/models";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserSlice = {
  token: "",
  chatToken: undefined,
  addressDefault: undefined,
  userInfo: {} as UserInfo,
  fcmToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.userInfo = {} as UserInfo;
      state.fcmToken = "";
      state.chatToken = undefined;
      state.addressDefault = undefined;
      // location.reload();
    },

    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },

    setChatToken: (state, { payload }: PayloadType<string | undefined>) => {
      state.chatToken = payload;
    },

    setUserInfo: (state, { payload }: { payload: UserInfo | undefined }) => {
      state.userInfo = payload;
    },

    editUserInfo: (state, { payload }: { payload: UserEdit }) => {
      if (state.userInfo) {
        state.userInfo.name = payload.name;
        state.userInfo.email = payload.email;
        state.userInfo.sex = payload.sex;

        if (payload?.image) {
          state.userInfo.avatar = payload.image;
        }
      }
    },

    setAddressDefault: (
      state,
      { payload }: { payload: ShippingAddress | undefined }
    ) => {
      state.addressDefault = payload;
    },

    setFCMToken: (state, { payload }: { payload: string }) => {
      state.fcmToken = payload;
    },
  },
});

export const {
  logout,
  setToken,
  setUserInfo,
  setAddressDefault,
  editUserInfo,
  setFCMToken,
  setChatToken,
} = userSlice.actions;

export const selectToken = (state: RootState) => state?.user?.token;
export const selectPartnerId = (state: RootState) => state?.user?.userInfo?.id;

export default userSlice.reducer;
