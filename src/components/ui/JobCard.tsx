import Image from "next/image";
import Link from "next/link";
import { Job } from "@/common/constants";

import { timeAgo } from "@/lib/helpers";
import { truncateString } from "@/lib/helpers";
import CommentsReactionsUI from "./CommentsReactionsUI";

interface IJobCardProps {
  job: Partial<Job>;
}

export const JobCard: React.FC<IJobCardProps> = ({ job }) => {
  const {
    id,
    title,
    description,
    website,
    comments,
    reactions,
    application_url,
    created_at,
    skills,
    status,
  } = job;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col xs:flex-row items-start space-x-3">
        {/* <div className="border border-gray-300 p-2 rounded-lg">
            <Image src="/icons/google.svg" width={40} height={40} alt="logo" />
          </div> */}
        <div className="flex flex-col space-y-2">
          <div>
            <Link href={`/dashboard/jobs/${id}`} className="block">
              <span className="font-app-medium">
                {/* {truncateString(title as string, 35)} */}
                {title}
              </span>
            </Link>
            {status && (
              <div className="space-y-2">
                <span className="capitalize text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
                  {status}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            {website && (
              <span className="flex items-center space-x-2">
                <Image src="/icons/link-2.svg" alt="" width={15} height={15} />
                <Link
                  href={website as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-800 break-all"
                >
                  {website}
                </Link>
              </span>
            )}
            {application_url && (
              <span className="flex items-center space-x-2">
                {/* Todo: Icon with text */}
                <Image src="/icons/git.svg" alt="" width={15} height={15} />
                <Link
                  href={application_url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-800 break-all"
                >
                  {application_url}
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>{" "}
      {description && (
        <p className="text-sm leading-snug text-gray-700">
          {truncateString(description as string, 140)}
        </p>
      )}
      <div className="flex gap-2 flex-wrap">
        {skills &&
          skills.map((skill, index) => (
            <div
              key={skill.title}
              className="capitalize text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
            >
              {skill.title}
            </div>
          ))}
      </div>
      <div
        className={`flex ${
          comments!?.length > 0 || reactions!?.length > 0
            ? "justify-between"
            : "justify-end"
        } text-xs text-gray-600`}
      >
        <CommentsReactionsUI comments={comments!} reactions={reactions!} />
        <span>{timeAgo(created_at as string)}</span>
      </div>
    </div>
  );
};
