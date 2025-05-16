"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfileIcon() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        messageRef.current &&
        !messageRef.current.contains(event.target as Node)
      ) {
        setIsMessageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={messageRef}>
      <Image
        src="/icons/messages.svg"
        alt="messages"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setIsMessageOpen(!isMessageOpen)}
      />
      {isMessageOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="p-4">
            <Link href="/profile" className="block text-sm text-gray-600">
              Account Settings
            </Link>
            <Link href="/settings" className="block text-sm text-gray-600">
              Account Settings
            </Link>
            <button className="mt-2 text-sm text-red-600">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
