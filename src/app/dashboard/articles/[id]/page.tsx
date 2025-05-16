"use client";

import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";

import { Article } from "@/common/constants";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import { RootState } from "@/store";
import AddArticleForm from "@/components/forms/ArticleForm";
import AppModal from "@/components/ui/Modal";
import { ArticleCardMain } from "@/components/ui/ArticleCardMain";
import { fetchArticle, deleteArticle } from "@/api";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import { CustomError } from "@/lib/helpers/class";
import PageWrapperWithError from "@/components/ui/PageWrapper";
import RecommendationsComponent from "@/components/ui/RecommendationsComponent";
import PageMainContent from "@/components/ui/MainContentWrapper";
import {
  selectCurrentUser,
  selectArticleRecommendations,
  selectIsRecommendationsLoading,
} from "@/lib/selectors";

export default function ArticlePage() {
  const router = useRouter();
  const { articleRecommendations, isRecommendationsLoading, user } =
    useSelector(
      (state: RootState) => ({
        user: selectCurrentUser(state),
        articleRecommendations: selectArticleRecommendations(state),
        isRecommendationsLoading: selectIsRecommendationsLoading(state),
      }),
      shallowEqual
    );
  const params = useParams();
  const id = params?.id;
  const {
    refetch,
    data: article,
    error,
    isLoading,
  } = useQuery<Article, Error>({
    queryKey: ["articles", id],
    queryFn: () => (id ? fetchArticle(id as string) : Promise.reject("No ID")),
    enabled: !!id,
  });
  const isOwner = user?.profile?.id === article?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (articleId: string) => deleteArticle(articleId),
    onSuccess: () => {
      successToast(feedbackTextMapper.delete("Article"));
      router.push("/dashboard/articles");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });
  const [updateArticleModalIsOpen, setUpdateArticleModalIsOpen] =
    useState<boolean>(false);

  const handleToggleUpdateArticleModal = useCallback(() => {
    setUpdateArticleModalIsOpen((prevState) => !prevState);
  }, []);
  const handleDelete = useCallback(
    (articleId: string) => {
      deleteMutation.mutate(articleId);
    },
    [deleteMutation]
  );

  const MemoizedRecommendations = useMemo(
    () => (
      <RecommendationsComponent
        resourceId={params?.id as string}
        recommendations={articleRecommendations}
        isLoading={isRecommendationsLoading}
        render={(article) => (
          <ArticleCardPreview
            article={article as Article}
            descriptionLimit={40}
          />
        )}
        title="Articles for you"
      />
    ),
    [articleRecommendations, isRecommendationsLoading]
  );

  return (
    <PageWrapperWithError error={error}>
      <PageMainContent
        isLoading={isLoading}
        contentData={article!}
        handleDelete={handleDelete}
        isOwner={isOwner}
        mainContent={(article, isOwner) => (
          <ArticleCardMain
            article={article as Article}
            isOwner={isOwner}
            toggleModal={handleToggleUpdateArticleModal}
            triggerRefetch={refetch}
          />
        )}
        asideContent={() => MemoizedRecommendations}
      />
      <AppModal
        title="Update article"
        isOpen={updateArticleModalIsOpen}
        onClose={() => handleToggleUpdateArticleModal()}
        width="w-full sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] xxl:w-[35%]"
      >
        <AddArticleForm
          triggerRefetch={refetch}
          data={article}
          handleModalClose={handleToggleUpdateArticleModal}
        />
      </AppModal>
    </PageWrapperWithError>
  );
}
