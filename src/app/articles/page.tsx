"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import FilterComponent from "@/components/ui/Filter";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import { Article, ArticlesWithPagination } from "@/common/constants";
import ContentWrapper from "@/components/ui/ContentWrapper";
import PaginationComponent from "@/components/ui/PaginationComponent";
import {
  SkeletonLoaderGrid,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";
import { fetchPublicArticles } from "@/api";

export default function Articles() {
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
    queryKey: ["articles", pagination],
    queryFn: () => fetchPublicArticles(pagination, filters),
    placeholderData: keepPreviousData,
  });

  let articles;
  let total = 0;

  if (articlesData) {
    const { total: pageTotal } = articlesData;
    articles = articlesData.data;
    total = pageTotal;
  }

  return (
    <div className="min-h-screen w-full bg-white p-1 lg:p-6">
      <div className="flex w-full space-x-0 md:space-x-5">
        <div className="w-full min-h-screen px-2 s:px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Connect, Learn, and Collaborate Through Insightful Articles"
            description="Explore a curated collection of articles written by top professionals and innovators across various fields. Whether you’re looking to collaborate on projects, exchange ideas, or gain new insights, discover articles that connect you with people who share your vision and can help you grow your expertise."
          />
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
                      className="w-full border border-gray-300 rounded-lg p-4 h-auto lg:h-48"
                    >
                      <ArticleCardPreview article={article} isPublic />
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
    </div>
  );
}
