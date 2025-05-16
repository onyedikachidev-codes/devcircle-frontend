import toast from "react-hot-toast";
import { capitalizeFirstLetter, formatErrorResponse } from ".";
import { CustomError } from "./class";

export const successToast = (message: string, id?: string) =>
  toast.success(capitalizeFirstLetter(message), {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
      backgroundColor: "#f0fdf4",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#f7f7f7",
      secondary: "#16a34a",
    },
  });

export const errorToast = (message: string, id?: string) =>
  toast.error(capitalizeFirstLetter(message), {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
      backgroundColor: "#fff1f2",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#f7f7f7",
      secondary: "#dc2626",
    },
  });

export const errorToastWithCustomError = (error: CustomError, id?: string) => {
  const message = formatErrorResponse(error);

  return errorToast(message, id);
};

export const infoToast = (message: string, id?: string) =>
  toast(capitalizeFirstLetter(message), {
    ...(id && { id }),
    position: "top-right",
    duration: 6000,
    style: {
      backgroundColor: "#dbeafe",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#f7f7f7",
      secondary: "#1d4ed8",
    },
  });
