import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoadStatus, Product } from "../../types";

interface ProductsState {
  items: Product[];
  status: LoadStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        return rejectWithValue(`Lỗi máy chủ (${res.status})`);
      }
      const data: Product[] = await res.json();
      return data;
    } catch {
      return rejectWithValue("Không thể kết nối tới API. Vui lòng thử lại.");
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Đã xảy ra lỗi";
      });
  },
});

export default productsSlice.reducer;
