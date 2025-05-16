"use client";

import Image from "next/image";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import { resetNotifications } from "@/store/notifications";
import { useRouter } from "next/navigation";

export default function NotificationIcon() {
  const { data: notifications } = useSelector(
    (state: RootState) => state.notifications,
    shallowEqual
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div
      className="relative"
      onClick={() => {
        dispatch(resetNotifications());

        router.push("/dashboard/notifications");
      }}
    >
      <Image
        src="/icons/notifications.svg"
        alt="notifications"
        width={0}
        height={0}
        className="cursor-pointer w-5 h-5"
      />
      {notifications.length > 0 && (
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 absolute -top-1 right-0"></span>
      )}
    </div>
  );
}
