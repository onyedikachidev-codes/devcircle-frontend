"use client";

import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import AppModal from "@/components/ui/Modal";
import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddArticleForm from "@/components/forms/ArticleForm";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import { Article } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import ContentWrapper from "@/components/ui/ContentWrapper";
import {
  ArticlesWithPagination,
  IFilters,
  IPagination,
} from "@/common/constants";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { RootState } from "@/store";
import {
  SkeletonLoaderGrid,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";
import { selectCurrentUser } from "@/lib/selectors";

const fetchArticles = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ArticlesWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/articles", {
      params: {
        contentType: "user",
        ...pagination,
        ...filters,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Articles() {
  const user = useSelector(
    (state: RootState) => selectCurrentUser(state),
    shallowEqual
  );
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    keyword: "",
    createdAt: "",
    order: "DESC",
    sortBy: "",
  });

  const {
    data: articlesData,
    error,
    isLoading,
    refetch,
  } = useQuery<ArticlesWithPagination, Error>({
    queryKey: ["articles", user?.profile?.id, pagination],
    queryFn: () => fetchArticles(pagination, filters),
    placeholderData: keepPreviousData,
  });

  let articles;
  let total = 0;

  if (articlesData) {
    const { total: pageTotal } = articlesData;
    articles = articlesData.data;
    total = pageTotal;
  }

  const [addArticleModalIsOpen, setAddArticleModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddArticleModal = () => {
    setAddArticleModalIsOpen(!addArticleModalIsOpen);
  };

  return (
    <div className="min-h-screen w-full bg-white p-1 lg:p-6">
      <div className="flex w-full space-x-0 md:space-x-5">
        <div className="w-full min-h-screen px-2 s:px-5 md:px-10 lg:px-20">
          <div className="relative">
            <DashboardPageHeader
              title="Connect, Learn, and Collaborate Through Insightful Articles"
              description="Explore a curated collection of articles written by top professionals and innovators across various fields. Whether you’re looking to collaborate on projects, exchange ideas, or gain new insights, discover articles that connect you with people who share your vision and can help you grow your expertise."
            />
            <div className="absolute top-3 right-3">
              <AddItemButton
                icon={
                  <div>
                    {WithTooltip(
                      "New Article",
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          stroke="#1D4ED8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 8h2m-2 4h2m0 4H7m0-8v4h4V8H7zM5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                        />
                      </svg>
                    )}
                  </div>
                }
                handleOnClick={handleToggleAddArticleModal}
                fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
              />
            </div>
          </div>
          <div className="py-5 flex flex-col space-y-5 w-full">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                sortByOptions: [
                  {
                    value: "created_at",
                    label: "Date Created",
                  },
                  { value: "views", label: "Views" },
                ],
              }}
            />{" "}
            {!isLoading && (
              <ContentWrapper data={articles as Article[]}>
                {articlesData &&
                  articles?.map((article: Article) => (
                    <div
                      key={article.id}
                      className="w-full border border-gray-300 rounded-lg p-4 h-auto md:h-48"
                    >
                      <ArticleCardPreview article={article} />
                    </div>
                  ))}
              </ContentWrapper>
            )}
            {isLoading && (
              <>
                <div className="hidden md:block">
                  <SkeletonLoaderGrid />
                </div>
                <div className="block md:hidden">
                  <SkeletonLoader />
                </div>
              </>
            )}
            {!isLoading && articlesData && articles && (
              <PaginationComponent
                data={articles}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
                tag="articles"
              />
            )}
          </div>
        </div>
      </div>
      <AppModal
        title="Create article"
        isOpen={addArticleModalIsOpen}
        onClose={() => handleToggleAddArticleModal()}
        width="w-full sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] xxl:w-[35%]"
      >
        <AddArticleForm />
      </AppModal>
    </div>
  );
}
