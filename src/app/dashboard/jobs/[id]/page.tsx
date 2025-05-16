"use client";

import { useCallback, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { shallowEqual, useSelector } from "react-redux";

import { Job } from "@/common/constants";
import { RootState } from "@/store";
import { fetchJob, deleteJob } from "@/api";
import { JobCardMain } from "@/components/ui/JobCardMain";
import AppModal from "@/components/ui/Modal";
import CreateJobForm from "@/components/forms/JobForm";
import { JobCard } from "@/components/ui/JobCard";
import PageWrapperWithError from "@/components/ui/PageWrapper";
import { CustomError } from "@/lib/helpers/class";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import RecommendationsComponent from "@/components/ui/RecommendationsComponent";
import PageMainContent from "@/components/ui/MainContentWrapper";
import {
  selectCurrentUser,
  selectIsRecommendationsLoading,
  selectJobRecommendations,
} from "@/lib/selectors";

export default function JobPage() {
  const router = useRouter();
  const { isRecommendationsLoading, jobsRecommendations, user } = useSelector(
    (state: RootState) => ({
      isRecommendationsLoading: selectIsRecommendationsLoading(state),
      user: selectCurrentUser(state),
      jobsRecommendations: selectJobRecommendations(state),
    }),
    shallowEqual
  );
  const params = useParams();
  const id = params?.id;
  const {
    refetch,
    data: job,
    error,
    isLoading,
  } = useQuery<Job, Error>({
    queryKey: ["jobs", id],
    queryFn: () => (id ? fetchJob(id as string) : Promise.reject("No ID")),
    enabled: !!id,
  });
  const isOwner = user?.profile?.id === job?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: () => {
      successToast(feedbackTextMapper.delete("Job"));
      router.push("/dashboard/jobs");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });
  const [addJobModalIsOpen, setAddJobModalIsOpen] = useState<boolean>(false);

  const handleDelete = useCallback(
    (jobId: string) => {
      deleteMutation.mutate(jobId);
    },
    [deleteMutation]
  );

  const handleToggleAddJobModal = useCallback(() => {
    setAddJobModalIsOpen((prevState) => !prevState);
  }, []);
  const MemoizedRecommendations = useMemo(
    () => (
      <RecommendationsComponent
        resourceId={params?.id as string}
        recommendations={jobsRecommendations}
        isLoading={isRecommendationsLoading}
        render={(job) => (
          <div className="border-b border-gray-200 last:border-0">
            <JobCard job={job as Job} />
          </div>
        )}
        title="Jobs you may be interested in"
      />
    ),
    [jobsRecommendations, isRecommendationsLoading]
  );

  return (
    <PageWrapperWithError error={error}>
      <PageMainContent
        isLoading={isLoading}
        contentData={job!}
        handleDelete={handleDelete}
        isOwner={isOwner}
        mainContent={(job, isOwner) => (
          <JobCardMain
            job={job as Job}
            isOwner={isOwner}
            toggleModal={handleToggleAddJobModal}
            triggerRefetch={refetch}
          />
        )}
        asideContent={() => MemoizedRecommendations}
      />
      <AppModal
        title="Update Job"
        isOpen={addJobModalIsOpen}
        onClose={() => handleToggleAddJobModal()}
      >
        <CreateJobForm
          triggerRefetch={refetch}
          data={job}
          handleModalClose={handleToggleAddJobModal}
        />
      </AppModal>
    </PageWrapperWithError>
  );
}
