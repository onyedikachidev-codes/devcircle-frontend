import Link from "next/link";

import { Activity, ActivityTypes } from "@/common/constants";

interface ActivityProps {
  activity: Activity;
  currentUserProfileId: string;
}

const activityTypeToMessage = {
  [ActivityTypes.COMMENT]: "commented on",
  [ActivityTypes.LIKE]: "liked",
  [ActivityTypes.FOLLOW]: "followed",
};

export const ActivityComponent: React.FC<ActivityProps> = ({
  activity,
  currentUserProfileId,
}) => {
  const { type, owner, participant, event, project, profile } = activity;

  const activityOwnerName =
    owner.id === currentUserProfileId
      ? "You"
      : owner.first_name + " " + owner.last_name;
  type === ActivityTypes.FOLLOW
    ? activityOwnerName + ""
    : activityOwnerName + "'s";

  const activityParticipant =
    participant?.id === currentUserProfileId &&
    participant?.id &&
    type === ActivityTypes.FOLLOW
      ? "You"
      : participant?.id === currentUserProfileId
      ? "Your"
      : participant.first_name + " " + participant.last_name;
  const resourceTitle = event?.title || project?.title;
  const resource = event || project || profile;
  const resourceType = event
    ? "events"
    : project
    ? "projects"
    : profile
    ? "profiles"
    : "";

  return (
    <div>
      <span className="text-xs">
        <span className="font-app-medium">{activityOwnerName}</span>{" "}
        <span className="text-gray-600">{activityTypeToMessage[type]}</span>{" "}
        <Link href={`/dashboard/profiles/${participant.id}`}>
          <span className="font-app-medium underline">
            {activityParticipant}
          </span>
        </Link>{" "}
        {resourceTitle && (
          <Link href={`/dashboard/${resourceType}/${resource.id}`}>
            <span className="underline">{resourceTitle}</span>
          </Link>
        )}
      </span>
    </div>
  );
};
