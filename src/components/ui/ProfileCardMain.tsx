import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MoreActionsComponent from "./MoreActions";
import { getFilenameAndExtension } from "@/lib/helpers";
import {
  Profile,
  Event,
  Job,
  Article,
  mapLanguageToFlag,
} from "@/common/constants";
import { EventCardPreview } from "./EventCard";
import { JobCard } from "./JobCard";
import { WithTooltip } from "./WithTooltip";
import { SkeletonLoader } from "./SkeletonLoader";
import ShareComponent from "./ShareComponent";
import { ArticleCardPreview } from "./ArticleCard";
import { ViewsComponent } from "./ViewsComponent";
import { Comments } from "./Comments";
import { useFollow } from "@/app/hooks/useFollow";
import TopIconBar from "./TopIconBar";
import AvatarComponent from "./AvatarComponent";

interface IProfileCardMainProps {
  profile: Profile;
  isMain?: boolean;
  isOwner?: boolean;
  hasFollowed?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
  handleToggleAccountsSettingsModal?: (prev: (o: boolean) => boolean) => void;
  handleToggleUpdateProfileModal?: (prev: (o: boolean) => boolean) => void;
}

export const ProfileCardMain: React.FC<IProfileCardMainProps> = ({
  profile,
  isMain,
  isOwner,
  hasFollowed,
  toggleModal,
  triggerRefetch,
  handleToggleAccountsSettingsModal,
  handleToggleUpdateProfileModal,
}) => {
  const {
    first_name,
    last_name,
    avatar,
    bio,
    heading,
    title,
    location,
    phone,
    website,
    linkedin,
    github,
    resume,
    languages,
    skills,
    status,
    id,
    comments = [],
    reactions = [],
    events,
    jobs,
    articles,
    is_mentor,
    user_id,
    views,
    mentor_note,
    requires_update,
  } = profile;
  const { handleFollow, justFollowed, handleUnfollow } = useFollow();

  return (
    <>
      <TopIconBar>
        {isMain && isOwner && (
          <div className="flex space-x-5">
            <div
              className="border border-gray-300 p-2 rounded-lg"
              onClick={() =>
                handleToggleUpdateProfileModal &&
                handleToggleUpdateProfileModal((o) => !o)
              }
            >
              {WithTooltip(
                "Edit profile",
                <Image src="/icons/edit.svg" alt="" width={20} height={20} />
              )}
            </div>
            <div
              className="border border-gray-300 p-2 rounded-lg"
              onClick={() =>
                handleToggleAccountsSettingsModal &&
                handleToggleAccountsSettingsModal((o) => !o)
              }
            >
              {WithTooltip(
                "Account Settings",
                <Image
                  src="/icons/settings.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
        )}
        {!isMain && <ViewsComponent views={views as number} />}
        {!isMain && !isOwner && (
          <div className="flex items-center space-x-2">
            {!hasFollowed && !justFollowed[id as string] && !isOwner && (
              <button
                onClick={() => handleFollow(id as string)}
                className="flex items-center p-2 bg-white border border-gray-300 text-sm rounded-full hover:bg-gray-100 text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 45.902 45.902"
                  className="w-4 h-4"
                >
                  <g>
                    <g>
                      <path
                        d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912
          c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299
          c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067
          l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"
                      />
                      <path
                        d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309
          c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714
          c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"
                      />
                      <path
                        d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454
          c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595
          c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            )}
            {!isOwner && (justFollowed[id as string] || hasFollowed) && (
              <MoreActionsComponent
                renderWithAction={(toggleMoreActionsModal: any) => (
                  <li
                    onClick={() => {
                      handleUnfollow(id as string);
                      toggleMoreActionsModal();
                    }}
                    className="text-xs text-gray-700 text-center px-3 py-2 cursor-pointer"
                  >
                    Unfollow
                  </li>
                )}
              />
            )}
          </div>
        )}
      </TopIconBar>
      <div className="relative space-y-4">
        <div className="flex flex-col space-y-6 border-b border-b-gray-200 py-2 lg:py-4">
          <div className="flex flex-col xs:flex-row items-center xs:space-x-6 justify-center xs:justify-normal">
            <AvatarComponent avatar={avatar} className="w-32 h-32" />
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl text-gray-900 flex items-center space-x-2 capitalize font-app-medium">
                    <span>
                      {first_name} {last_name}
                    </span>
                    {is_mentor && (
                      <span className="text-xs font-app-normal rounded text-gray-700 bg-green-200 py-1 px-1">
                        mentor
                      </span>
                    )}
                  </span>
                  {title && (
                    <span className="text-sm text-gray-700 font-normal">
                      {title}
                    </span>
                  )}
                </div>
                {heading && (
                  <div>
                    <span className="text-sm text-custom-gray-paragraph">
                      {heading}
                    </span>
                  </div>
                )}
              </div>
              {status && (
                <div className="space-x-2 capitalize">
                  <span className="text-xs font-medium rounded text-gray-700 bg-violet-200 py-1 px-1">
                    {status}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {!requires_update && (
          <div>
            <div className="space-y-3 border-b border-b-gray-200 py-2 lg:py-4">
              <h3 className="text-sm font-bold">Details</h3>
              <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {location && (
                  <div className="space-y-1">
                    <h3 className="text-sm text-gray-600 font-bold">
                      Location
                    </h3>
                    <div className="flex space-x-2 items-center">
                      <span className="text-xs">{location}</span>
                    </div>
                  </div>
                )}
                {phone && (
                  <div className="space-y-1">
                    <h3 className="text-sm text-gray-600 font-bold">Phone</h3>
                    <div className="flex space-x-2 items-center">
                      <span className="text-xs text-blue-800">{phone}</span>
                    </div>
                  </div>
                )}
                {linkedin && (
                  <div className="space-y-1">
                    <h3 className="text-sm text-gray-600 font-bold">
                      Linkedin
                    </h3>
                    <div className="flex space-x-2 items-center">
                      <Link
                        href={linkedin!}
                        className="text-xs text-blue-800 break-all"
                        target="_blank"
                      >
                        {linkedin}
                      </Link>
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
                {github && (
                  <div className="space-y-1">
                    <h3 className="text-sm text-gray-600 font-bold">Github</h3>
                    <div className="flex space-x-2 items-center">
                      <Link
                        href={github!}
                        className="text-xs text-blue-800 break-all"
                        target="_blank"
                      >
                        {github}
                      </Link>
                    </div>
                  </div>
                )}
                {languages && languages?.length > 0 && (
                  <div className="space-y-1">
                    <h3 className="text-sm text-gray-600 font-bold">
                      Languages
                    </h3>
                    <div className="flex space-x-3">
                      {(languages as string[]).map((language: string) => (
                        <span
                          className="rounded-full inline-block bg-slate-50 p-1 shadow"
                          key={language}
                        >
                          {WithTooltip(
                            language,
                            <Image
                              src={`/icons/${
                                (mapLanguageToFlag as any)[language]
                              }.svg`}
                              alt=""
                              width={23}
                              height={23}
                              className="rounded-full"
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <ShareComponent text="Collaborate with this professional on TechGather" />
              </div>
            </div>
            {bio && (
              <div className="space-y-2 border-b border-b-gray-200 py-4">
                <h3 className="text-sm font-bold">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
              </div>
            )}
            {is_mentor && mentor_note && (
              <div className="space-y-2 border-b border-b-gray-200 py-4">
                <h3 className="text-sm font-bold">Mentor Note</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mentor_note}
                </p>
              </div>
            )}
            {skills && (
              <div className="space-y-2 border-b border-b-gray-200 py-4">
                <h3 className="text-sm font-bold">Skills</h3>
                <div className="flex gap-2 flex-wrap">
                  {skills.map((skill: { title: string }) => (
                    <div
                      key={skill.title}
                      className="capitalize text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
                    >
                      {skill.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resume && (
              <div className="w-full border-b border-b-gray-200 py-4">
                <div className="space-y-2 w-full xs:w-2/3">
                  <h3 className="text-sm font-bold">Resume</h3>
                  <div className="space-y-2">
                    <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
                      <Link href={resume as string} download target="_blank">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Image
                              src="/icons/file.svg"
                              width={20}
                              height={20}
                              alt="file icon"
                            />
                            <span className="break-all">
                              {getFilenameAndExtension(resume)}
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
            {events && (
              <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold">Events</h3>
                  <Link
                    href={"/dashboard/me/events"}
                    className="text-xs text-gray-600 flex items-center space-x-2"
                  >
                    <span>View events</span>
                    <Image
                      src="/icons/link.svg"
                      width={15}
                      height={15}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 gap-x-5">
                  {[...events]?.splice(0, 2).map((event: Event) => {
                    return (
                      <div
                        key={event.id}
                        className="border border-gray-300 rounded-lg px-3 py-6"
                      >
                        <EventCardPreview event={event} isPreview />
                      </div>
                    );
                  })}
                </div>
                {!events.length && (
                  <div
                    className="text-custom-gray-paragraph"
                    style={{ fontSize: "13.5px" }}
                  >
                    Events will be displayed here.
                  </div>
                )}
              </div>
            )}
            {articles && (
              <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold">Articles</h3>
                  <Link
                    href={"/dashboard/me/articles"}
                    className="text-xs text-gray-600 flex items-center space-x-2"
                  >
                    <span>View articles</span>
                    <Image
                      src="/icons/link.svg"
                      width={15}
                      height={15}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 gap-x-5">
                  {[...articles].splice(0, 2).map((article: Article) => (
                    <div
                      key={article.id}
                      className="border border-gray-300 rounded-lg px-3 py-6"
                    >
                      <ArticleCardPreview article={article} />
                    </div>
                  ))}
                </div>
                {(articles as Article[])?.length === 0 && (
                  <div
                    className="text-custom-gray-paragraph"
                    style={{ fontSize: "13.5px" }}
                  >
                    Articles will be listed here.
                  </div>
                )}
              </div>
            )}
            {jobs && (
              <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold">Jobs</h3>
                  <Link
                    href={"/dashboard/me/jobs"}
                    className="text-xs text-gray-600 flex items-center space-x-2"
                  >
                    <span>View jobs</span>
                    <Image
                      src="/icons/link.svg"
                      width={15}
                      height={15}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 gap-x-5">
                  {[...jobs]?.splice(0, 2).map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-300 p-2 md:p-3 rounded-lg"
                    >
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
                {!(jobs as Job[]).length && (
                  <div
                    className="text-custom-gray-paragraph"
                    style={{ fontSize: "13.5px" }}
                  >
                    Jobs will be listed here.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {requires_update && <SkeletonLoader />}
      </div>
    </>
  );
};
