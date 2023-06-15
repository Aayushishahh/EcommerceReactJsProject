import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const getProfile = createAsyncThunk(
  "profileData/getProfile",
  async (data) => {
    try {
      const response = await api.profile.get(data);
      console.log("profieresponse", response);
      return response;
    } catch (error) {
      console.log("profileerror", error);
    }
  }
);

export const updatedProfile = createAsyncThunk(
  "profileData/updateProfile",
  async (data) => {
    console.log("data", data);
    try {
      const response = await api.profile.patch(data);
      console.log("updatedresponse", response);
      return response;
    
    } catch (error) {
      console.log("updatederror", error);
    }
  }
);

const initialState = {
  userData: {},
  profileData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
    logout : (state,action) => {
    state = null
    }
    // updateProfile: (state, action) => {
    //   state.profileData = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profileData = action.payload;
    });

    builder.addCase(updatedProfile.fulfilled, (state, action) => {
      state.profileData = action.payload;
    });
  },
});

export const { login, updateProfile ,logout} = authSlice.actions;

export default authSlice.reducer;
