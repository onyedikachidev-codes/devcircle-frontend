import React from "react";
import Image from "next/image";

interface IDashboardEventCardProps {
  id: string;
  banner?: string;
  title: string;
  description: string;
  location: string;
  website: string;
  startDate: string;
  endDate: string;
  ticketLink: string;
  likeCount: string;
  commentCount: string;
  dateCreated: string;
}

const DashboardEventCard: React.FC<IDashboardEventCardProps> = ({
  id,
  banner,
  title,
  description,
  location,
  website,
  startDate,
  endDate,
  ticketLink,
  commentCount,
  likeCount,
  dateCreated,
}) => {
  return (
    <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-3">
      <div className="flex h-1/2 items-center space-x-3">
        <div
          className="w-full rounded-lg bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${banner})`,
            height: "100%",
          }}
        ></div>
      </div>
      <div className="w-full flex flex-col justify-center h-full">
        <span className="font-semibold text-gray-700 leading-tight">
          {title}
        </span>
      </div>
      <p className="text-sm leading-snug text-gray-700">{description}</p>
      <div>
        <div className="flex space-x-1 text-sm leading-snug text-gray-700">
          <Image
            src={"/icons/profile.svg"}
            alt="profile"
            width={15}
            height={15}
          />
          <span className="text-custom-gray-paragraph">{location}</span>
        </div>
        <div className="flex space-x-1 text-sm leading-snug text-gray-700">
          <Image
            src={"/icons/profile.svg"}
            alt="profile"
            width={15}
            height={15}
          />
          <span className="text-custom-gray-paragraph">{website}</span>
        </div>
        <div className="flex space-x-1 text-sm leading-snug text-gray-700">
          <Image
            src={"/icons/profile.svg"}
            alt="profile"
            width={15}
            height={15}
          />
          <span className="text-custom-gray-paragraph">{ticketLink}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs text-gray-600">
          <div className="">
            <span className="underline">
              <span>{commentCount}</span> <span>Comments</span>
            </span>
          </div>
          <div>
            <span className="underline">
              <span>{likeCount}</span> <span className="underline">Likes</span>
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-600 text-right">{dateCreated}</div>
      </div>
    </div>
  );
};

export default DashboardEventCard;
