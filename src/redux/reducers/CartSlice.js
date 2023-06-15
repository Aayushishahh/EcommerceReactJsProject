import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const addCart = createAsyncThunk("cart/addcart", async (data) => {
  console.log("datacart", data);
  try {
    const response = await api.cart.add(data);
    return response;
  } catch (error) {}
});

export const getCart = createAsyncThunk("cart/getCart", async (data) => {
  try {
    const response = await api.cart.get(data);
    return response.data.data;
  } catch (error) {}
});

export const removecartItems = createAsyncThunk(
  "cart/removecartItems",
  async (data) => {
    try {
      const response = await api.cart.remove(data);
      return data.id;
    } catch (error) {}
  }
);

export const getOrderDetails = createAsyncThunk(
  "cart/getOrderDetails",
  async (data) => {
    try {
      const response = await api.order.get(data);
      console.log("ordderresponse", response);
      return response.data.data;
    } catch (error) {
      console.log("ordererror", error);
    }
  }
);

// export const getOrderById = createAsyncThunk(
//   "cart/getOrderById",
//   async (id) => {
//     try {
//       const response = await api.order.getOrderById(id);
//       console.log('orderresponse', response)
//       return response;
//     } catch (error) {}
//   }
// );

const initialState = {
  cartItems: [],
  cartproducts: [],
  ordersummary: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartproducts = action.payload;
    });
    builder.addCase(removecartItems.fulfilled, (state, action) => {
      console.log("action", action);
      state.cartproducts = state.cartproducts.filter(
        (item) => item.product_id && item.product_id._id !== action.payload
      );
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.ordersummary = action.payload;
    });
  },
});
export const { addToCart, deleteCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
