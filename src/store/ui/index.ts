import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    mainFeedSettings: {
      contentTypeFrom: "following",
      contentType: "articles",
    },
    isPageLoading: false,
  },
  reducers: {
    setPageLoading(state, action) {
      state.isPageLoading = action.payload;
    },
    setMainFeedSettings(state, action) {
      state.mainFeedSettings = action.payload;
    },
  },
});

export const { setPageLoading, setMainFeedSettings } = uiSlice.actions;
export default uiSlice.reducer;
