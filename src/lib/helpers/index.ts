import CryptoJS from "crypto-js";
import { Connections, Profile } from "@/common/constants";
import { DateInfo, FormatDateOptions } from "./constants";
import { CustomError } from "./class";

export const formatDateShort = (
  dateString: string,
  { monthType, weekdayType }: FormatDateOptions
): DateInfo => {
  const date = new Date(dateString);

  const dayOfWeek = date.toLocaleString("en-US", { weekday: weekdayType });
  const day = date.getDate().toString();
  const month = date.toLocaleString("en-US", { month: monthType });

  return { dayOfWeek, day, month };
};

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeIntervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (diffInSeconds >= timeIntervals.year) {
    const years = Math.floor(diffInSeconds / timeIntervals.year);
    return years > 1 ? `${years} years ago` : "1 year ago";
  } else if (diffInSeconds >= timeIntervals.month) {
    const months = Math.floor(diffInSeconds / timeIntervals.month);
    return months > 1 ? `${months} months ago` : "1 month ago";
  } else if (diffInSeconds >= timeIntervals.day) {
    const days = Math.floor(diffInSeconds / timeIntervals.day);
    return days > 1 ? `${days} days ago` : "1 day ago";
  } else if (diffInSeconds >= timeIntervals.hour) {
    const hours = Math.floor(diffInSeconds / timeIntervals.hour);
    return hours > 1 ? `${hours} hours ago` : "1 hour ago";
  } else if (diffInSeconds >= timeIntervals.minute) {
    const minutes = Math.floor(diffInSeconds / timeIntervals.minute);
    return minutes > 1 ? `${minutes} mins ago` : "1 min ago";
  } else {
    return "Just now";
  }
};

export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][day % 10 < 4 ? day % 10 : 0] || "th";
  const dayWithSuffix = `${day}${suffix}`;
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const time = `${hour12}:${minutes}${ampm}`;

  return `${dayOfWeek}, ${dayWithSuffix} ${month}, ${year} ${time}`;
};

export const getFilenameAndExtension = (url: string): string => {
  const pathname = new URL(url).pathname;
  const filenameWithExt = pathname.substring(pathname.lastIndexOf("/") + 1);
  const dotIndex = filenameWithExt.lastIndexOf(".");
  const filename = filenameWithExt.substring(0, dotIndex);
  const extension = filenameWithExt.substring(dotIndex + 1);

  return filename + "." + extension;
};

export const stripHtml = (html: string) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
};

export const getHasFollowed = (
  connections: Connections,
  followingProfileId: string
) => {
  return (connections.following || [])
    .map((following) => {
      return following.profile_id as string;
    })
    .includes(followingProfileId);
};

export const decryptData = (
  encryptedData: string,
  iv: string,
  key: string
): Record<string, any> | null => {
  try {
    const parsedKey = CryptoJS.enc.Hex.parse(key);
    const parsedIv = CryptoJS.enc.Hex.parse(iv);
    const encryptedWordArray = CryptoJS.enc.Hex.parse(encryptedData);

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedWordArray,
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, parsedKey, {
      iv: parsedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      throw new Error("Failed to decrypt data or invalid UTF-8 output");
    }

    return JSON.parse(decryptedText);
  } catch (error: any) {
    console.error("Decryption error:", error.message);
    return null;
  }
};

export function isWithinLast10Minutes(lastSeen: Date) {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  return lastSeen >= tenMinutesAgo;
}

export function getTime(date: Date) {
  const neDate = new Date(date);
  const formattedTime = neDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedTime;
}

export function sanitizeFile(file: File) {
  const sanitizedFile = new File([file], file.name.replace(/\s+/g, "_"), {
    type: file.type,
  });

  return sanitizedFile;
}

export function serializeData<T extends Record<string, any>>(data: T): T {
  const serializedData: Record<string, any> = { ...data };

  Object.keys(serializedData).forEach((key) => {
    const value = serializedData[key];

    if (value === null || value === undefined || value === "") {
      serializedData[key] = null;
    }
  });

  return serializedData as T;
}

export function formatErrorResponse(error: CustomError): string {
  const errorResponse = error.response?.data?.error;

  if (Array.isArray(errorResponse)) {
    return errorResponse[0];
  }

  if (typeof errorResponse === "string") {
    return errorResponse;
  }

  if (error.message) return error.message;

  return "An error occurred while processing your request. Please try again later.";
}

export const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const arraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  return arr2.every((item) => set1.has(item));
};
