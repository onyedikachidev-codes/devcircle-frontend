"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";

import { Event } from "@/common/constants";
import { EventCardMain } from "@/components/ui/EventCardMain";
import { EventCardPreview } from "@/components/ui/EventCard";
import { RootState } from "@/store";
import { useCallback, useMemo, useState } from "react";
import AppModal from "@/components/ui/Modal";
import AddEventForm from "@/components/forms/EventForm";
import { fetchEvent, deleteEvent } from "@/api";
import PageWrapperWithError from "@/components/ui/PageWrapper";
import PageMainContent from "@/components/ui/MainContentWrapper";
import RecommendationsComponent from "@/components/ui/RecommendationsComponent";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import { CustomError } from "@/lib/helpers/class";
import {
  selectCurrentUser,
  selectEventsRecommendations,
  selectIsRecommendationsLoading,
} from "@/lib/selectors";

export default function EventPage() {
  const router = useRouter();
  const { isRecommendationsLoading, eventRecommendations, user } = useSelector(
    (state: RootState) => ({
      user: selectCurrentUser(state),
      isRecommendationsLoading: selectIsRecommendationsLoading(state),
      eventRecommendations: selectEventsRecommendations(state),
    }),
    shallowEqual
  );
  const params = useParams();
  const id = params?.id;

  const {
    refetch,
    data: event,
    error,
    isLoading,
  } = useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: () => (id ? fetchEvent(id as string) : Promise.reject("No ID")),
    enabled: !!id,
  });

  const isOwner = user?.profile?.id === event?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: () => {
      successToast(feedbackTextMapper.delete("Event"));
      router.push("/dashboard/events");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });

  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = useCallback(() => {
    setAddEventModalIsOpen((prevState) => !prevState);
  }, []);
  const handleDelete = useCallback(
    (eventId: string) => {
      deleteMutation.mutate(eventId);
    },
    [deleteMutation]
  );

  const MemoizedRecommendations = useMemo(
    () => (
      <RecommendationsComponent
        resourceId={params?.id as string}
        recommendations={eventRecommendations}
        isLoading={isRecommendationsLoading}
        render={(event) => (
          <EventCardPreview event={event as Event} isPreview />
        )}
        title="Events for you"
      />
    ),
    [eventRecommendations, isRecommendationsLoading]
  );

  return (
    <PageWrapperWithError error={error}>
      <PageMainContent
        isLoading={isLoading}
        contentData={event!}
        handleDelete={handleDelete}
        isOwner={isOwner}
        mainContent={(event, isOwner) => (
          <EventCardMain
            currentUserProfileId={user?.profile?.id}
            event={event as Event}
            isOwner={isOwner}
            toggleModal={handleToggleAddEventModal}
            triggerRefetch={refetch}
          />
        )}
        asideContent={() => MemoizedRecommendations}
      />
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
      >
        <AddEventForm
          data={event as Event}
          handleModalClose={handleToggleAddEventModal}
          triggerRefetch={refetch}
        />
      </AppModal>
    </PageWrapperWithError>
  );
}
