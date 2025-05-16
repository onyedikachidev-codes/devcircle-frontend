import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, User } from "@/common/constants";

interface InitialState {
  data: User;
  error: null | string;
}

const initialState: InitialState = {
  data: {
    id: "",
    email: "",
    created_at: "",
    status: "",
    last_seen: new Date(),
    profile: {
      id: "",
      first_name: "",
      views: 0,
      email: "string",
      last_name: "",
      avatar: "",
      bio: "",
      location: "",
      phone: "",
      website: "",
      linkedin: "",
      github: "",
      resume: "",
      languages: [],
      comments: [],
      reactions: [],
      heading: "",
      title: "",
      skills: [],
      followers: [],
      following: [],
    },
  },
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const response = await axiosInstance.get(`/api/proxy/users/${userId}`);
    return response.data?.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axiosInstance.get(`/api/proxy/users/me`);

    return response.data?.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.data.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error?.message || "Failed to fetch user";
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.error = action.error?.message || "Failed to fetch user";
    });
  },
});

export const { setUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;
