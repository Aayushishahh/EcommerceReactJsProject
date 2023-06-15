import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    const response = await api.product.get();
    return response.data.data.product;
  } catch (error) {}
});

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    try {
      const response = await api.product.getProductById(id);
      return response.data.data.Product;
    } catch (error) {}
  }
);

export const searchproduct = createAsyncThunk(
  "product/searchproduct",
  async (data) => {
    try {
      const response = await api.search.get(data);
      return response;
    } catch (error) {}
  }
);

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (category) => {
    try {
      const response = await api.product.getProductByCategory(category);
      return response.data.data;
    } catch (error) {}
  }
);

export const getBestSeller = createAsyncThunk(
  "product/getBestSeller",
  async () => {
    try {
      const response = await api.product.getBestSeller();
      //  console.log('responsebestseller', response)
      return response.data.data;
    } catch (error) {
      console.log("errror", error);
    }
  }
);

const initialState = {
  description: {
    loading: false,
    productdetails: [],
  },

  category: {
    loading: false,
    product: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductById.pending, (state, action) => {
        return {
          ...state,
          description: {
            ...state.description,
            loading: true,
          },
        };
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        return {
          ...state,
          description: {
            loading: false,
            productdetails: action.payload,
          },
        };
      })
      .addCase(getProductById.rejected, (state, action) => {
        return {
          ...state,
          description: {
            ...state.description,
            loading: false,
          },
        };
      });

    builder
      .addCase(searchproduct.fulfilled, (state, action) => {
        const data = action.meta.arg;
        state.product = action.payload.data.data.product.filter((product) =>
          product.name.toLowerCase().includes(data.toLowerCase())
        );
      })

      .addCase(getProductByCategory.pending, (state, action) => {
        return {
          ...state,
          category: {
            ...state.category,
            loading: true,
          },
        };
      })
      // state.product = action.payload;

      .addCase(getProductByCategory.fulfilled, (state, action) => {
        return {
          ...state,
          category: {
            loading: false,
            product: action.payload,
          },
        };
      })

      .addCase(getProductByCategory.rejected, (state, action) => {
        return {
          ...state,
          category: {
            ...state.category,
            loading: false,
          },
        };
      });

    builder.addCase(getBestSeller.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export default productSlice.reducer;
