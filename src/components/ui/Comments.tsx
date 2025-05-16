import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { formatDateLong } from "@/lib/helpers";
import { WithTooltip } from "./WithTooltip";
import { Comment, Connection, Reaction } from "@/common/constants";
import { useMutation } from "@tanstack/react-query";
import { createComment, deleteComment, createReaction } from "@/api";
import { ProfilePreviewCard } from "./ProfileCardPreview";
import AppModal from "./Modal";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store";
import { CustomError } from "@/lib/helpers/class";
import { errorToastWithCustomError } from "@/lib/helpers/toast";
import { selectConnectionsData, selectCurrentUser } from "@/lib/selectors";
import AvatarComponent from "./AvatarComponent";

import "../../app/globals.css";

interface ICommentsProps {
  isOwner: boolean;
  resource: string;
  resourceId: string;
  comments: Comment[];
  reactions: Reaction[];
  triggerRefetch?: () => void;
}

export const Comments: React.FC<ICommentsProps> = ({
  isOwner,
  resource,
  resourceId,
  comments,
  reactions,
  triggerRefetch,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fansModalIsOpen, setFansModalIsOpen] = useState(false);
  const { user, connectionsData } = useSelector(
    (state: RootState) => ({
      user: selectCurrentUser(state),
      connectionsData: selectConnectionsData(state),
    }),
    shallowEqual
  );
  const currentUserProfileId = user?.profile?.id;
  const commentMutation = useMutation({
    mutationFn: ({
      resource,
      resourceId,
      data,
    }: {
      resource: string;
      resourceId: string;
      data: Partial<Comment>;
    }) => createComment(resource, resourceId, data),
    onSuccess: () => {
      triggerRefetch && triggerRefetch();
      setNewComment("");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const reactionMutation = useMutation({
    mutationFn: ({
      resource,
      resourceId,
    }: {
      resource: string;
      resourceId: string;
    }) => createReaction(resource, resourceId),
    onSuccess: () => {
      triggerRefetch && triggerRefetch();
      setNewComment("");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({
      resource,
      resourceId,
      commentId,
    }: {
      resource: string;
      resourceId: string;
      commentId: string;
    }) => deleteComment(resource, resourceId, commentId),
    onSuccess: () => {
      triggerRefetch && triggerRefetch();
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });

  const handleAddComment = () => {
    setIsLoading(true);
    const trimmedText = newComment.trim();

    (async function () {
      await commentMutation.mutate({
        resource,
        resourceId,
        data: { text: trimmedText },
      });
    })();
  };

  const handleDeleteComment = (commentId: string) => {
    (async function () {
      await deleteMutation.mutate({
        resource,
        resourceId,
        commentId,
      });
    })();
  };

  const handleAddReaction = () => {
    (async function () {
      await reactionMutation.mutate({
        resource,
        resourceId: resourceId,
      });
    })();
  };

  const handleToggleFansModal = () => {
    setFansModalIsOpen((o) => !o);
  };

  return (
    <div className="space-y-4 p-3 rounded-lg">
      <div className="flex items-center space-x-5">
        <div className="flex space-x-1 items-center">
          {WithTooltip(
            "Comments",
            <svg
              className="w-5 h-5"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path d="m0 0h32v32h-32z" />
                <path
                  d="m24 2c4.418278 0 8 3.581722 8 8v9c0 4.418278-3.581722 8-8 8h-14.65568992c-.8644422 0-1.70562318.280039-2.39757043.7981793l-3.74795444 2.8065233c-.88415838.6620708-2.13762479.4820332-2.79969558-.4021251-.25907013-.3459737-.39908963-.7665641-.39908963-1.1987852v-19.0037923c0-4.418278 3.581722-8 8-8zm-2.571997 10.0964585c-.4991419-.2363809-1.0954008-.023371-1.3317816.4757709-.6771647 1.4299014-2.3250027 2.4280053-4.099688 2.4280053-1.7734204 0-3.4129473-.9905459-4.0942267-2.416524-.2380843-.4983315-.8350673-.7093035-1.3333988-.4712192-.4983316.2380843-.70930361.8350673-.4712193 1.3333988 1.0200199 2.1349917 3.3692971 3.5543444 5.8988448 3.5543444 2.5328429 0 4.8924921-1.4292516 5.9072405-3.5719947.2363808-.4991418.0233709-1.0954007-.4757709-1.3317815z"
                  fill="#1d4ed8"
                />
              </g>
            </svg>
          )}
          <span className="text-xs-sm">({comments!.length})</span>
        </div>
        <div className="flex space-x-1 items-center">
          {WithTooltip(
            "Reactions",
            <div onClick={() => handleAddReaction()}>
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-5 h-5"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
                xmlSpace="preserve"
              >
                <path
                  fill="#ef4444"
                  d="M48,5c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0
	c0,0-3.971-3.97-3.979-3.961C24.418,6.791,20.418,5,16,5C7.163,5,0,12.163,0,21c0,3.338,1.024,6.436,2.773,9
	c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,57.609,30.977,58,32,58s2.047-0.391,2.828-1.172
	c0,0,23.93-23.93,24.797-24.797S61.227,30,61.227,30C62.976,27.436,64,24.338,64,21C64,12.163,56.837,5,48,5z M57,22
	c-0.553,0-1-0.447-1-1c0-4.418-3.582-8-8-8c-0.553,0-1-0.447-1-1s0.447-1,1-1c5.522,0,10,4.478,10,10C58,21.553,57.553,22,57,22z"
                />
              </svg>
            </div>
          )}
          {WithTooltip(
            "View profiles",
            <span
              onClick={() => handleToggleFansModal()}
              className="text-xs-sm cursor-pointer"
            >
              ({reactions!.length})
            </span>
          )}
        </div>
      </div>
      <div className="sticky self-start">
        <div className="space-y-2 border border-gray-300 rounded-lg p-1 py-2.5 overflow-y-auto max-h-72 hide-scroll">
          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="px-2 py-1.5 rounded-lg flex items-center space-x-3 border-b border-gray-100 justify-between"
              >
                <div className="flex items-center space-x-4">
                  <AvatarComponent
                    avatar={comment.owner.avatar}
                    className="w-7 h-7"
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/profiles/${comment.owner.id}`}
                        className="text-xs text-custom-gray-paragraph font-app-light"
                      >
                        {comment.owner.first_name +
                          " " +
                          comment.owner.last_name}
                      </Link>
                      <span
                        className="inline-block w-0.5 h-0.5 rounded-full bg-gray-900"
                        style={{ width: "3px", height: "3px" }}
                      ></span>
                      <span
                        className="text-xs text-custom-gray-paragraph"
                        style={{ fontSize: "11px" }}
                      >
                        {formatDateLong(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm leading-normal">
                      {comment.text}
                    </p>
                  </div>
                </div>
                {(isOwner || comment.owner.id === currentUserProfileId) && (
                  <div
                    onClick={() => handleDeleteComment(comment.id)}
                    className="cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="m0 0h32v32h-32z" />
                        <path
                          d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z"
                          fill="#ef4444"
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex items-center space-x-3 px-3 pb-2 bg-white sticky -bottom-3 self-start">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 placeholder:text-xs text-xs-sm font-app-light placeholder:text-custom-gray-paragraph rounded-lg focus:border-0 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
            <button
              disabled={isLoading || newComment.trim()?.length === 0}
              onClick={() => handleAddComment()}
              className="bg-blue-500 text-white text-xs px-4 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Posting" : "Post"}
            </button>
          </div>
        </div>
      </div>
      <AppModal
        title="Reactions"
        isOpen={fansModalIsOpen}
        onClose={() => handleToggleFansModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {reactions &&
              reactions.length > 0 &&
              reactions.map((reaction: Reaction) => {
                let hasFollowed = false;

                if (user && connectionsData)
                  hasFollowed = (connectionsData.following || [])
                    .map((following) => (following as Connection).profile_id)
                    .includes(reaction.owner?.id!);
                return (
                  <div
                    key={reaction.id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={reaction.owner.email}
                      currentUserProfileId={currentUserProfileId}
                      name={
                        reaction.owner.first_name +
                        " " +
                        reaction.owner.last_name
                      }
                      title={reaction.owner.title || ""}
                      profile_id={reaction.owner.id!}
                      user_id={reaction.owner.user_id}
                      avatar={
                        reaction.owner.avatar ||
                        "/images/profile-placeholder.png"
                      }
                      hasFollowed={hasFollowed}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
    </div>
  );
};
