import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { fetchNotifications } from "@/store/notifications";
import { AppDispatch } from "@/store";

const NotificationsPollingComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPolling();
      } else {
        stopPolling();
      }
    };

    if (document.visibilityState === "visible") {
      startPolling();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  return null;
};

export default NotificationsPollingComponent;
