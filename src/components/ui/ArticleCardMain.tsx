import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";

import { Article, Profile } from "@/common/constants";
import { formatDateLong } from "@/lib/helpers";
import { ViewsComponent } from "./ViewsComponent";
import { WithTooltip } from "./WithTooltip";
import { Comments } from "./Comments";
import TopIconBar from "./TopIconBar";
import ShareComponent from "./ShareComponent";
import { infoToast } from "@/lib/helpers/toast";
import { PublicComments } from "./PublicCommentsComponent";

import "../../app/globals.css";

interface IArticleCardMainProps {
  article: Article;
  isOwner?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
  isPublic?: boolean;
}

export const ArticleCardMain: React.FC<IArticleCardMainProps> = ({
  article,
  isOwner,
  toggleModal,
  triggerRefetch,
  isPublic,
}) => {
  const {
    id,
    banner,
    title,
    body,
    comments,
    reactions,
    created_at,
    owner,
    views,
  } = article;

  return (
    <>
      <TopIconBar>
        <div className="flex space-x-2">
          <ViewsComponent views={views as number} />
          {isOwner &&
            WithTooltip(
              "Edit article",
              <div onClick={() => toggleModal && toggleModal()}>
                <Image src="/icons/edit.svg" alt="" width={20} height={20} />
              </div>
            )}
        </div>
      </TopIconBar>
      <div className="relative space-y-5">
        <div className="flex flex-col xs:flex-row items-start xs:items-center xs:space-x-5">
          <div className="relative w-full md:w-2/3 h-40 md:h-80 bg-orange-50">
            {banner && (
              <Image
                src={banner}
                alt="event banner"
                className="rounded-lg"
                layout="fill"
              />
            )}
          </div>
          <div className="space-y-4 my-2 xs:my-0">
            <div className="space-y-1">
              <h3 className="text-sm text-gray-400">Author</h3>
              <div className="flex space-x-2 items-center">
                <Link
                  href={`/dashboard/profiles/${owner.id}`}
                  className="text-sm text-gray-600"
                >
                  {(owner as Profile).first_name} {(owner as Profile).last_name}
                </Link>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm text-gray-400">Posted</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-sm text-gray-600">
                  {formatDateLong(created_at)}
                </span>
              </div>
            </div>
            <ShareComponent
              text="This article on TechGather is everything"
              page="article"
            />
          </div>
        </div>
        <div className="space-y-2 w-full">
          <p className="text-gray-800 text-xl font-app-medium leading-normal xs:leading-relaxed">
            {title}
          </p>
        </div>
        <div>
          <p
            className="text-gray-600 text-sm leading-relaxed article-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
          />
        </div>
        {!isPublic && (
          <Comments
            isOwner={isOwner!}
            resource="articles"
            resourceId={id}
            triggerRefetch={triggerRefetch}
            comments={comments}
            reactions={reactions}
          />
        )}
        {isPublic && (
          <PublicComments comments={comments} reactions={reactions} />
        )}
      </div>
    </>
  );
};
