import Image from "next/image";
import Link from "next/link";

import { formatDateLong } from "@/lib/helpers";
import { Job } from "@/common/constants";
import { ViewsComponent } from "./ViewsComponent";
import { WithTooltip } from "./WithTooltip";
import { Comments } from "./Comments";
import TopIconBar from "./TopIconBar";
import ShareComponent from "./ShareComponent";

interface IJobCardMainProps {
  job: Partial<Job>;
  isOwner?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
}

export const JobCardMain: React.FC<IJobCardMainProps> = ({
  job,
  isOwner,
  toggleModal,
  triggerRefetch,
}) => {
  const {
    id,
    title,
    description,
    website,
    comments,
    reactions,
    application_url,
    skills,
    created_at,
    deadline,
    status,
    owner,
    views,
  } = job;

  return (
    <>
      <TopIconBar>
        <div className="flex space-x-3">
          <ViewsComponent views={views as number} />
          {isOwner &&
            WithTooltip(
              "Edit job",
              <div onClick={() => toggleModal && toggleModal()}>
                <Image src="/icons/edit.svg" alt="" width={20} height={20} />
              </div>
            )}
        </div>
      </TopIconBar>
      <div className="relative space-y-4">
        <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-4">
          <div className="flex flex-col xs:flex-row items-center space-x-6">
            {/* <div className="border border-gray-300 p-1 rounded-lg">
              <Image
                src="/icons/google.svg"
                width={70}
                height={70}
                alt=""
                className="rounded-lg"
              />
            </div> */}
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="font-app-medium text-2xl text-gray-900">
                  {title}
                </span>
              </div>
              {status && (
                <div className="space-y-2">
                  <span className="capitalize text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
                    {status}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-3 border-b border-b-gray-200 pb-4">
          <h3 className="text-sm font-bold">Details</h3>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {deadline && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Deadline</h3>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs">
                    {formatDateLong(deadline as string)}
                  </span>
                </div>
              </div>
            )}
            {website && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Website</h3>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs text-blue-800">{website}</span>
                </div>
              </div>
            )}
            {application_url && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Apply Here</h3>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs text-blue-800">
                    {application_url}
                  </span>
                </div>
              </div>
            )}
            {owner && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
                <div className="flex space-x-2 items-center">
                  <Link
                    className="text-sm text-gray-400 font-bold"
                    href={`/dashboard/profiles/${owner.id}`}
                  >
                    {owner.first_name} {owner.last_name}
                  </Link>
                </div>
              </div>
            )}
            <ShareComponent text="This opportunity on TechGather might interest you" />
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Posted</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-xs">
                  {formatDateLong(created_at as string)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {description && (
          <div className="space-y-2 border-b border-b-gray-200 pb-4">
            <h3 className="text-sm font-bold">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}
        {skills && !!skills.length && (
          <div className="space-y-2 border-b border-b-gray-200 pb-4">
            <h3 className="text-sm font-bold">Skills</h3>
            <div className="flex gap-2 flex-wrap">
              {skills.map((skill, index) => (
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
        <Comments
          isOwner={isOwner!}
          resource="jobs"
          resourceId={id!}
          comments={comments!}
          reactions={reactions!}
          triggerRefetch={triggerRefetch}
        />
      </div>
    </>
  );
};
