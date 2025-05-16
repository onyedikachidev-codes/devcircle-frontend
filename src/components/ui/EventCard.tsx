import Image from "next/image";
import Link from "next/link";

import { Event } from "@/common/constants";
import { truncateString, formatDateShort } from "@/lib/helpers";
import { FormatDateOptionsEnum } from "@/lib/helpers/constants";
import CommentsReactionsUI from "./CommentsReactionsUI";

interface IEventCardPreviewProps {
  event: Partial<Event>;
  isPreview?: boolean;
}

export const EventCardPreview: React.FC<IEventCardPreviewProps> = ({
  isPreview,
  event,
}) => {
  const {
    id,
    banner,
    title,
    location,
    description,
    event_start_date,
    comments,
    reactions,
  } = event;

  const { dayOfWeek, day, month } = formatDateShort(
    event_start_date as string,
    {
      monthType: FormatDateOptionsEnum.SHORT,
      weekdayType: FormatDateOptionsEnum.SHORT,
    }
  );

  return (
    <div className={`h-full ${!isPreview ? "pb-3" : "pb-0"} relative`}>
      <Link href={`/dashboard/events/${id}`}>
        <div className="h-full flex items-center space-x-5">
          {event_start_date && (
            <div className="max-w-28 sm:max-w-20">
              <div className="flex flex-col justify-center items-center">
                <span className="text-xs text-custom-gray-paragraph">
                  {dayOfWeek}
                </span>
                <span className="text-lg font-app-medium text-custom-gray-heading">
                  {day}
                </span>
                <span className="text-xs text-custom-gray-paragraph">
                  {month}
                </span>
              </div>
            </div>
          )}
          <div className="hidden sm:block w-1/3 h-full min-h-20 relative rounded-lg bg-orange-50">
            {banner && (
              <Image
                src={banner!}
                alt="banner"
                className="rounded-lg"
                layout="fill"
              />
            )}
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex flex-col space-y-2 py-2">
              <div className="flex flex-col">
                {title && (
                  <span className="font-app-medium">
                    {truncateString(title as string, 25)}
                  </span>
                )}
                {location && (
                  <span className="text-xs text-custom-gray-paragraph">
                    {location}
                  </span>
                )}
              </div>
              {description && (
                <span className="text-sm text-custom-gray-paragraph font-light leading-snug">
                  {truncateString(description as string, 70)}
                </span>
              )}
            </div>
          </div>
        </div>
        {!isPreview && (
          <CommentsReactionsUI comments={comments!} reactions={reactions!} />
        )}
      </Link>
    </div>
  );
};
