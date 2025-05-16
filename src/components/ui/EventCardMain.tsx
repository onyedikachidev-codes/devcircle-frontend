import Image from "next/image";
import Link from "next/link";

import { formatDateLong, getFilenameAndExtension } from "@/lib/helpers";
import { WithTooltip } from "./WithTooltip";
import { Event } from "@/common/constants";
import { ViewsComponent } from "./ViewsComponent";
import { Comments } from "./Comments";
import TopIconBar from "./TopIconBar";
import ShareComponent from "./ShareComponent";

interface IEventCardMainProps {
  currentUserProfileId: string;
  event: Event;
  isMain?: boolean;
  isOwner?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
}

export const EventCardMain: React.FC<IEventCardMainProps> = ({
  event,
  isOwner,
  toggleModal,
  triggerRefetch,
}) => {
  const {
    id,
    banner,
    title,
    location,
    description,
    website,
    event_start_date,
    event_end_date,
    comments,
    reactions,
    owner,
    attachment,
    ticket_link,
    link: meeting_link,
    views,
  } = event;

  return (
    <>
      <TopIconBar>
        <div className="flex space-x-3">
          <ViewsComponent views={views as number} />
          {isOwner &&
            WithTooltip(
              "Edit event",
              <div onClick={() => toggleModal && toggleModal()}>
                <Image src="/icons/edit.svg" alt="" width={20} height={20} />
              </div>
            )}
        </div>
      </TopIconBar>
      <div className="relative space-y-5">
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-center sm:space-x-5">
          <div className="relative w-full sm:w-2/3 h-36 sm:h-80 bg-orange-50">
            {banner && (
              <Image
                src={banner!}
                alt="event banner"
                className="rounded-lg"
                layout="fill"
              />
            )}
          </div>
          <div className="space-y-2 w-full sm:w-1/2">
            {event_start_date && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Starts</h3>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs">
                    {formatDateLong(event_start_date as string)}
                  </span>
                </div>
              </div>
            )}
            {event_end_date && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Ends</h3>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs">
                    {formatDateLong(event_end_date as string)}
                  </span>
                </div>
              </div>
            )}
            {website && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Website</h3>
                <div className="flex space-x-2 items-center">
                  <Link
                    href={website!}
                    className="text-xs text-blue-800 break-all"
                    target="_blank"
                  >
                    {website}
                  </Link>
                </div>
              </div>
            )}
            {ticket_link && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Ticket Link</h3>
                <div className="flex space-x-2 items-center">
                  <Link
                    href={ticket_link!}
                    className="text-xs text-blue-800 break-all"
                    target="_blank"
                  >
                    {ticket_link}
                  </Link>
                </div>
              </div>
            )}
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
              <div className="flex space-x-2 items-center">
                <Link
                  href={`/dashboard/profiles/${owner?.id}`}
                  className="text-sm text-gray-400 font-bold"
                >
                  {owner?.first_name} {owner?.last_name}
                </Link>
              </div>
            </div>
            <ShareComponent text="View this and more great events on TechGather" />
          </div>
        </div>
        <div className="space-y-2 py-2 border-b border-gray-200">
          <span className="text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
            {new Date(event_start_date as string) > new Date()
              ? "Not started"
              : new Date(event_end_date as string) < new Date()
              ? "Event Ended"
              : "In progress"}
          </span>
          {title && (
            <p className="text-gray-800 text-xl font-app-medium leading-relaxed">
              {title}
            </p>
          )}
          {meeting_link && (
            <p className="text-xs text-blue-800">{meeting_link}</p>
          )}
          {location && <p className="text-sm text-gray-600">{location}</p>}
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
        {attachment && (
          <div className="w-full border-b border-b-gray-200 py-4">
            <div className="space-y-2 w-2/3">
              <h3 className="text-sm font-bold">Attachment</h3>
              <div className="space-y-2">
                <div className="border border-gray-300 p-1 sm:p-3 rounded-lg text-xs bg-slate-50">
                  <Link href={attachment as string} download target="_blank">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/icons/file.svg"
                          width={20}
                          height={20}
                          alt="file icon"
                        />
                        <span className="">
                          {getFilenameAndExtension(attachment)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {WithTooltip(
                          "Download",
                          <Image
                            src="/icons/download.svg"
                            width={18}
                            height={18}
                            alt="file icon"
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <Comments
          isOwner={isOwner!}
          triggerRefetch={triggerRefetch}
          resource="events"
          resourceId={id}
          comments={comments}
          reactions={reactions}
        />
      </div>
    </>
  );
};
