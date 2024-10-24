import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const response = axiosInstance.post("/auth/signin", data);
    toast.promise(response, {
      loading: "Submitting form",
      success: "Successfully signed in",
      error: (err) => `${err?.response?.data}`,
    });
    return await response;
  } catch (err) {
    console.log(err);
  }
});

export const sigunup = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return await response;
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: JSON.parse(localStorage.getItem("data")) || {},
    token: localStorage.getItem("role") || "",
    role: localStorage.getItem("role") || "",
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.data = {};
      state.token = "";
      state.role = "";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload?.data?.token != undefined;
      state.data = action.payload?.data?.userData;
      state.token = action.payload?.data?.token;
      state.role = action.payload?.data?.userData?.userType;
      if (action.payload) {
        localStorage.setItem("isLoggedIn", state.isLoggedIn);
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem("token", state.token);
        localStorage.setItem("role", state.role);
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
