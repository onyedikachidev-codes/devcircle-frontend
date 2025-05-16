import { Article, Job, Event } from "@/common/constants";
import { SkeletonLoaderPage } from "./SkeletonLoader";

type ContentData = Article | Event | Job;

interface IPageMainContentProps {
  isLoading: boolean;
  contentData: ContentData;
  isOwner: boolean;
  handleDelete?: (id: string) => void;
  mainContent: (data: ContentData, isOwner: boolean) => React.ReactNode;
  asideContent: undefined | (() => React.ReactNode);
}

const PageMainContent: React.FC<IPageMainContentProps> = ({
  isLoading,
  contentData,
  isOwner,
  mainContent,
  asideContent,
  handleDelete,
}) => {
  return (
    <div
      className={`min-h-screen ${
        !asideContent ? "w-full lg:w-9/12 mx-auto" : "w-full"
      } bg-white`}
    >
      <div className="flex space-x-5 p-2 xs:p-4 sm:p-6">
        <div className="flex-1 p-2 md:p-4 flex flex-col space-y-5 w-full border-0 xs:border border-gray-300 rounded-lg relative">
          {isLoading && <SkeletonLoaderPage />}
          {!isLoading && contentData && (
            <div className="w-full">
              <>{mainContent(contentData, isOwner)}</>
              {isOwner && (
                <div
                  className="w-full text-center cursor-pointer"
                  onClick={() =>
                    handleDelete && handleDelete(contentData?.id as string)
                  }
                >
                  <span className="inline-block rounded text-xs text-red-500 bg-red-50 px-3 py-2">
                    Delete
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        {asideContent && (
          <aside className="hidden lg:block w-1/3 space-y-5">
            {asideContent()}
          </aside>
        )}
      </div>
    </div>
  );
};

export default PageMainContent;
