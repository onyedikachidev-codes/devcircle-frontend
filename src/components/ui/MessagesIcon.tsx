"use client";

import Image from "next/image";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import { resetNotifications } from "@/store/notifications";
import { useRouter } from "next/navigation";

export default function MessagesIcon() {
  const notifications = useSelector(
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

        router.push("/dashboard/messages");
      }}
    >
      <Image
        src="/icons/messages.svg"
        alt="messages"
        width={0}
        height={0}
        className="w-5 h-5 cursor-pointer"
      />
      {notifications?.messages?.length > 0 && (
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 absolute -top-1 -right-1"></span>
      )}
    </div>
  );
}
