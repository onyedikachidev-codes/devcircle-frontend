import Image from "next/image";
import Link from "next/link";

import { Profile, Article } from "@/common/constants";
import { truncateString, timeAgo, stripHtml } from "@/lib/helpers";
import CommentsReactionsUI from "./CommentsReactionsUI";

interface IArticleCardPreviewProps {
  article: Partial<Article>;
  isPreview?: boolean;
  descriptionLimit?: number;
  isPublic?: boolean;
}

export const ArticleCardPreview: React.FC<IArticleCardPreviewProps> = ({
  article,
  isPreview,
  descriptionLimit,
  isPublic,
}) => {
  const { id, banner, title, body, comments, reactions, created_at, owner } =
    article;
  return (
    <div className="space-x-4 h-full relative">
      <Link href={isPublic ? `articles/${id}` : `/dashboard/articles/${id}`}>
        <div className="h-full flex flex-col text-center sm:text-left sm:flex-row items-center space-x-0 sm:space-x-5">
          <div className="w-full sm:w-1/3 min-h-40 relative rounded-lg bg-orange-50">
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
              <div className="flex flex-col space-y-1">
                {owner && (
                  <span className="text-xs-sm text-gray-500">
                    <span className="font-bold">Author:</span>{" "}
                    {(owner as Profile).first_name}{" "}
                    {(owner as Profile).last_name}
                  </span>
                )}
                <span className="text-xs-sm text-gray-500">
                  <span className="font-bold">Posted:</span>{" "}
                  {timeAgo(created_at as string)}
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-app-medium">
                  {truncateString(title as string, 25)}
                </span>
              </div>
              {!isPreview && (
                <span className="text-sm text-left text-custom-gray-paragraph font-light leading-snug">
                  {truncateString(
                    stripHtml(body as string),
                    descriptionLimit || 80
                  )}
                </span>
              )}
            </div>
            {!isPreview && (
              <CommentsReactionsUI
                comments={comments!}
                reactions={reactions!}
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
