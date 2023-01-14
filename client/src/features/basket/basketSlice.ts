import agent from "@/app/api/agent";
import { IBasket } from "@/app/models/basket.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketState {
  basket: IBasket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  IBasket,
  { productId: number; quantity?: number }
>(
  "bakset/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; isDelete?: boolean }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.removeItem(productId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response?.data });
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<IBasket>) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.basket = action.payload;
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      const { isDelete } = action.meta.arg;
      const prefix = isDelete ? "pendingDeleteItem" : "pendingRemoveItem";
      state.status = prefix + action.meta.arg.productId;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (x) => x.productId === productId
      );
      if (itemIndex === -1 || !state.basket) return;
      state.basket!.items[itemIndex!].quantity -= quantity;
      if (state.basket!.items[itemIndex!].quantity === 0)
        state.basket!.items.splice(itemIndex!, 1);

      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const { setBasket } = basketSlice.actions;
