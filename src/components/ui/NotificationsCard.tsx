import Image from "next/image";
import Link from "next/link";

import { Notification } from "@/common/constants";
import { timeAgo } from "@/lib/helpers";
import { markAsRead, resetNotifications } from "@/store/notifications";
import { AppDispatch } from "@/store";
import AvatarComponent from "./AvatarComponent";

const FollowNotification = ({
  notification,
  newNotifications,
}: {
  notification: Notification;
  newNotifications: string[];
}) => {
  const isNewNotification = newNotifications.includes(notification.id);

  return (
    <div className="border-b border-gray-200 px-2 sm:px-4 lg:px-10 py-2 lg:py-4 relative hover:bg-slate-50">
      <div className="flex items-center space-x-3">
        <AvatarComponent
          avatar={notification.initiator.profile.avatar}
          className="w-10 h-10"
        />
        <div className="space-y-1 flex-col flex">
          <span className="text-xs-sm font-app-light">
            <Link
              className="text-gray-600 font-app-medium"
              href={`/dashboard/profiles/${notification.initiator.profile.id}`}
            >
              {notification.initiator.profile.first_name +
                " " +
                notification.initiator.profile.last_name}{" "}
            </Link>
            <span>followed you</span>
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(notification.created_at!)}
          </span>
        </div>
      </div>
      {isNewNotification && (
        <span className="inline-block w-2 h-2 rounded-full absolute top-4 right-3 bg-blue-600"></span>
      )}
    </div>
  );
};

const CommentNotification = ({
  notification,
  newNotifications,
}: {
  notification: Notification;
  newNotifications: string[];
}) => {
  const resource = (notification as any)[notification.resource_type];
  const isNewNotification = newNotifications.includes(notification.id);

  return (
    <div className="border-b border-gray-200 px-2 sm:px-4 lg:px-10 py-2 lg:py-4 relative hover:bg-slate-50">
      <div className="flex items-start space-x-3">
        <AvatarComponent
          avatar={notification.initiator.profile.avatar}
          className="w-10 h-10"
        />
        <div className="space-y-4 flex-col flex w-full">
          <div className="space-y-1 flex-col flex">
            <span className="text-sm font-app-light">
              <Link
                className="text-gray-600 font-app-medium"
                href={`/dashboard/profiles/${notification.initiator.profile.id}`}
              >
                {notification.initiator.profile.first_name +
                  " " +
                  notification.initiator.profile.last_name}{" "}
              </Link>
              {"  "}
              <span>
                {notification.category.includes("feedback")
                  ? "left a feedback in"
                  : "commented in"}
              </span>
              {"  "}
              <Link
                className="text-gray-600 font-app-medium"
                href={`/dashboard/${notification.resource_type}s/${resource.id}`}
              >
                {resource.title}
              </Link>
            </span>
            <span className="text-xs text-gray-500">
              {timeAgo(notification.created_at!)}
            </span>
          </div>
          {notification.content && (
            <div>
              <span className="bg-slate-100 text-gray-600 text-sm leading-relaxed w-full block px-3 py-2 rounded">
                {notification.content}
              </span>
            </div>
          )}
        </div>
      </div>
      {isNewNotification && (
        <span className="inline-block w-2 h-2 rounded-full absolute top-4 right-3 bg-blue-600"></span>
      )}
    </div>
  );
};

const ReactionNotification = ({
  notification,
  newNotifications,
}: {
  notification: Notification;
  newNotifications: string[];
}) => {
  const resource = (notification as any)[notification.resource_type];
  const isNewNotification = newNotifications.includes(notification.id);

  return (
    <div className="border-b border-gray-200 px-2 sm:px-4 lg:px-10 py-2 lg:py-4 relative hover:bg-slate-50">
      <div className="flex items-start space-x-3">
        <AvatarComponent
          avatar={notification.initiator.profile.avatar}
          className="w-10 h-10"
        />
        <div className="space-y-4 flex-col flex w-full">
          <div className="space-y-1 flex-col flex">
            <span className="text-xs-sm font-app-light">
              <Link
                className="text-gray-600 font-app-medium"
                href={`/dashboard/profiles/${notification.initiator.profile.id}`}
              >
                {notification.initiator.profile.first_name +
                  " " +
                  notification.initiator.profile.last_name}{" "}
              </Link>
              {"  "}
              <span>liked your {notification.resource_type}</span>
              {"  "}
              <Link
                className="text-gray-600 font-app-medium"
                href={`/dashboard/${notification.resource_type}s/${resource.id}`}
              >
                {resource.title}
              </Link>
            </span>
            <span className="text-xs text-gray-500">
              {timeAgo(notification.created_at!)}
            </span>
          </div>
        </div>
      </div>
      {isNewNotification && (
        <span className="inline-block w-2 h-2 rounded-full absolute top-4 right-3 bg-blue-600"></span>
      )}
    </div>
  );
};

const NotificationsCard = ({
  notification,
  newNotifications,
  dispatch,
}: {
  notification: Notification;
  newNotifications: string[];
  dispatch: AppDispatch;
}) => {
  return (
    <div
      onClick={() =>
        newNotifications.length > 0 && dispatch(markAsRead(notification.id))
      }
      className="cursor-pointer"
    >
      {notification.category.includes("comment") ||
        (notification.category.includes("feedback") && (
          <CommentNotification
            notification={notification}
            newNotifications={newNotifications}
          />
        ))}
      {notification.category.includes("follow") && (
        <FollowNotification
          notification={notification}
          newNotifications={newNotifications}
        />
      )}
      {notification.category.includes("reaction") && (
        <ReactionNotification
          notification={notification}
          newNotifications={newNotifications}
        />
      )}
    </div>
  );
};

export default NotificationsCard;
