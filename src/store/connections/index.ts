import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "@/lib/axiosInstance";

const initialState = {
  data: {
    followers: [],
    following: [],
  },
  error: false,
  isLoading: false,
};

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async () => {
    const response = await axiosInstance.get(
      "/api/proxy/profiles/connections/all"
    );

    return response.data?.data;
  }
);

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnections.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
