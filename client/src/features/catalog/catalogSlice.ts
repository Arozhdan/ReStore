import agent from "@/app/api/agent";
import { IProduct } from "@/app/models/product.interface";
import { RootState } from "@/app/store/configureStore";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter<IProduct>();

export const fetchProductsAsync = createAsyncThunk<IProduct[]>(
  "catalog/fetchProductsAsync",
  async (_, thinkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (error: any) {
      return thinkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const fetchProductAsync = createAsyncThunk<IProduct, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      productsAdapter.setAll(state, action.payload);
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      state.status = "idle";
      productsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload);

      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
