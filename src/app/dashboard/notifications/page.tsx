"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import axiosInstance from "@/lib/axiosInstance";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { NotificationsWithPagination, IPagination } from "@/common/constants";
import NotificationsCard from "@/components/ui/NotificationsCard";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { AppDispatch, RootState } from "@/store";

const fetchNotifications = async (
  pagination: IPagination
): Promise<NotificationsWithPagination> => {
  const response = await axiosInstance.get("/api/proxy/notifications", {
    params: {
      ...pagination,
    },
  });

  return response.data.data;
};

export default function Notifications() {
  const newNotificationsData = useSelector(
    (state: RootState) => state.notifications,
    shallowEqual
  );
  const newNotifications = newNotificationsData.data;
  const dispatch = useDispatch<AppDispatch>();

  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ["notifications", pagination, newNotifications],
    queryFn: () => fetchNotifications(pagination),
    placeholderData: keepPreviousData,
  });

  let notifications;
  let total = 0;

  if (notificationsData) {
    const { total: pageTotal } = notificationsData;

    notifications = notificationsData.data;
    total = pageTotal;
  }

  return (
    <div className="min-h-screen w-full bg-white pb-5">
      <div className="min-h-screen w-full sm:w-10/12 lg:w-8/12 mx-auto">
        <div className="flex flex-col">
          {!isLoading && (
            <>
              <div className="w-full px-4 lg:px-10 flex space-x-1 items-center py-2 lg:py-5 border-b border-b-gray-200 font-app-medium">
                <h3 className="text-lg">Notifications</h3>
                {newNotifications?.length > 0 && (
                  <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center">
                    <span
                      className="inline-block text-white"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      {newNotifications?.length}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-5">
                {notifications &&
                  notifications.map((notification) => (
                    <NotificationsCard
                      key={notification.id}
                      notification={notification}
                      newNotifications={newNotifications}
                      dispatch={dispatch}
                    />
                  ))}
              </div>
            </>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && notifications && (
            <PaginationComponent
              data={notifications}
              total={total}
              setPagination={setPagination}
              limit={pagination.limit}
              tag="notifications"
            />
          )}
        </div>
      </div>
    </div>
  );
}
