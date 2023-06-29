import { PayloadType, Product } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface searchProductHistorySlice {
  data: Product[]
}

const initialState: searchProductHistorySlice = {
  data: [],
}

const searchProductHistorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addSearchHistoryProduct: (state, { payload }: PayloadType<Product>) => {
      const index = state.data?.findIndex(
        ({ id_product_att }) => id_product_att === payload.id_product_att
      )
      if (index !== -1) {
        state.data = state.data.filter((item) => item.id_product_att !== payload.id_product_att)
      }
      ;(state.data || []).unshift(payload)

      if (state?.data?.length > 8) {
        state.data = state.data.filter(
          (item) => item.id_product_att !== state.data[8].id_product_att
        )
      }
    },
    deleteSearchHistoryProduct: (state, { payload }: PayloadType<number>) => {
      if (!state?.data?.length) return
      state.data = state.data.filter((item) => item.id_product_att !== payload)
    },
    clearSearchHistoryProduct: (state) => {
      state.data = []
    },
  },
})

export default searchProductHistorySlice.reducer

export const { addSearchHistoryProduct, clearSearchHistoryProduct, deleteSearchHistoryProduct } =
  searchProductHistorySlice.actions
