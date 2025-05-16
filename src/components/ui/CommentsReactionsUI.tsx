import { Comment, Reaction } from "@/common/constants";

const CommentsReactionsUI = ({
  comments = [],
  reactions = [],
}: {
  comments: Comment[];
  reactions: Reaction[];
}) => {
  return (
    <>
      {(comments!.length > 0 || reactions!.length > 0) && (
        <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1 justify-end">
          {!!comments?.length && (
            <span className="underline">
              <span>
                {comments?.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </span>
            </span>
          )}
          {!!reactions?.length && (
            <span className="underline">
              <span>
                {reactions?.length}{" "}
                {reactions.length === 1 ? "Reaction" : "Reactions"}
              </span>
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default CommentsReactionsUI;
