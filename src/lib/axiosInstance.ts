import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { store } from "@/store";
import { CustomError } from "./helpers/class";
import { NextResponse } from "next/server";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const excludedRoutes = [
  "/api/proxy/profile",
  "/api/proxy/files/upload",
  "/auth",
];

axiosInstance.interceptors.request.use(
  async (config) => {
    const profileRequiresUpdate =
      store.getState()?.user?.data?.profile?.requires_update;

    const isExcludedRoute = excludedRoutes.some(
      (route) =>
        config.url?.startsWith(route) && !config.url?.includes("follow")
    );
    if (
      profileRequiresUpdate &&
      config.method &&
      config.method.toLowerCase() !== "get" &&
      !isExcludedRoute
    ) {
      throw new Error("Please update your profile to unlock full access!");
    }

    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      signOut();
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
