"use client";

import React, { useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import PaginationComponent from "@/components/ui/PaginationComponent";
import { RootState, AppDispatch } from "@/store";
import { fetchConnections } from "@/store/connections";
import { setMainFeedSettings } from "@/store/ui";
import AppModal from "@/components/ui/Modal";
import AddEventForm from "@/components/forms/EventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { ProfilePreviewCard } from "@/components/ui/ProfileCardPreview";
import AddItemButton from "@/components/ui/AddItemButton";
import { Event, User, Connection } from "@/common/constants";
import { WithTooltip } from "@/components/ui/WithTooltip";
import CreateArticleForm from "@/components/forms/ArticleForm";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import {
  SkeletonCardRounded,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";
import { fetchEventsData, fetchArticlesData } from "@/api";
import RecommendationsComponent from "@/components/ui/RecommendationsComponent";
import {
  selectUpcomingEventsRecommendations,
  selectLiveEventsRecommendations,
  selectEventsRecommendations,
  selectIsRecommendationsLoading,
  selectCurrentUser,
  selectConnectionsData,
} from "../../lib/selectors";

import "../../app/globals.css";
import AvatarComponent from "@/components/ui/AvatarComponent";

const MainFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mainFeedSettings } = useSelector((state: RootState) => state.ui);
  const {
    upcomingEventsRecommendations,
    liveEventsRecommendations,
    eventsRecommendations,
    isRecommendationsLoading,
    currentUser,
    connectionsData,
  } = useSelector(
    (state: RootState) => ({
      upcomingEventsRecommendations: selectUpcomingEventsRecommendations(state),
      liveEventsRecommendations: selectLiveEventsRecommendations(state),
      eventsRecommendations: selectEventsRecommendations(state),
      isRecommendationsLoading: selectIsRecommendationsLoading(state),
      currentUser: selectCurrentUser(state),
      connectionsData: selectConnectionsData(state),
    }),
    shallowEqual
  );

  const [eventsPagination, setEventsPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [articlesPagination, setArticlesPagination] = useState({
    page: 1,
    limit: 5,
  });

  const { data: eventsData, isLoading: eventsIsLoading } = useQuery({
    queryKey: [
      "events",
      eventsPagination.page,
      eventsPagination.limit,
      mainFeedSettings.contentTypeFrom,
    ],
    queryFn: () =>
      fetchEventsData(eventsPagination, mainFeedSettings.contentTypeFrom),
    enabled: mainFeedSettings.contentType === "events",
    placeholderData: keepPreviousData,
  });

  const { data: articlesData, isLoading: articlesIsLoading } = useQuery({
    queryKey: [
      "articles",
      articlesPagination.page,
      articlesPagination.limit,
      mainFeedSettings.contentTypeFrom,
    ],
    queryFn: () =>
      fetchArticlesData(articlesPagination, mainFeedSettings.contentTypeFrom),
    enabled: mainFeedSettings.contentType === "articles",
    placeholderData: keepPreviousData,
  });

  let events;
  let eventsTotal: number = 0;

  if (eventsData) {
    const { total: pageTotal } = eventsData;
    events = eventsData.data;
    eventsTotal = pageTotal;
  }

  let articles;
  let articlesTotal: number = 0;

  if (articlesData) {
    const { total: pageTotal } = articlesData;
    articles = articlesData.data;
    articlesTotal = pageTotal;
  }

  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);
  const [addArticleModalIsOpen, setAddArticleModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = () => {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  };

  const handleToggleAddArticleModal = () => {
    setAddArticleModalIsOpen(!addArticleModalIsOpen);
  };

  const handleMainFeedContentChange = (type: string) => {
    dispatch(
      setMainFeedSettings({
        contentType: type,
        contentTypeFrom: mainFeedSettings.contentTypeFrom,
      })
    );
  };

  const handleMainFeedContentFromChange = (type: string) => {
    dispatch(
      setMainFeedSettings({
        contentType: mainFeedSettings.contentType,
        contentTypeFrom: type,
      })
    );
  };

  const handleToggleFollowersModal = () => {
    setFollowersModalIsOpen((o) => !o);
  };

  const handleToggleFollowingModal = () => {
    setFollowingModalIsOpen((o) => !o);
  };

  const eventsToDisplay =
    upcomingEventsRecommendations?.length > 0
      ? upcomingEventsRecommendations
      : liveEventsRecommendations?.length > 0
      ? liveEventsRecommendations
      : eventsRecommendations;

  const MemoizedRecommendations = useMemo(
    () => (
      <RecommendationsComponent
        recommendations={eventsToDisplay}
        isLoading={isRecommendationsLoading}
        title={
          upcomingEventsRecommendations?.length > 0
            ? "Upcoming events"
            : liveEventsRecommendations?.length > 0
            ? "Live events"
            : "Events you may be interested in"
        }
        render={(event) => (
          <EventCardPreview event={event as Event} isPreview />
        )}
      />
    ),
    [
      eventsToDisplay,
      upcomingEventsRecommendations,
      liveEventsRecommendations,
      isRecommendationsLoading,
    ]
  );

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex lg:space-x-5">
        <div className="w-1/3 hidden xl:block">
          <aside className="w-full space-y-5 md:sticky top-0 self-start">
            {MemoizedRecommendations}
          </aside>
        </div>
        <div className="w-full md:flex-1">
          <div className="space-y-6 sticky top-0 self-start">
            <div
              className={`p-4 rounded-lg border border-gray-300 space-y-5 s:space-y-3 flex flex-col s:flex-row items-center justify-between`}
            >
              {currentUser?.id && (
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col text-center s:text-left s:flex-row items-center space-x-2">
                    <AvatarComponent
                      avatar={currentUser.profile.avatar}
                      className="w-16 h-16"
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-base text-custom-gray-heading font-custom font-app-medium">
                        {currentUser.profile.first_name}{" "}
                        {currentUser.profile.last_name}
                      </span>
                      <span className="text-xs text-custom-gray-small-text">
                        {currentUser.profile.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <span
                      className="underline cursor-pointer"
                      onClick={() =>
                        !!connectionsData.followers?.length &&
                        handleToggleFollowersModal()
                      }
                    >
                      <span>{connectionsData.followers?.length}</span>{" "}
                      <span>Followers</span>
                    </span>
                    <span
                      className="underline cursor-pointer"
                      onClick={() =>
                        !!connectionsData.following?.length &&
                        handleToggleFollowingModal()
                      }
                    >
                      <span>{connectionsData.following?.length}</span>{" "}
                      <span className="underline">Following</span>
                    </span>
                  </div>
                </div>
              )}
              {!currentUser?.id && <SkeletonCardRounded />}
              <div className="space-y-3 xs:space-y-6">
                <div className="">
                  <div className="flex justify-start xs:justify-end items-center space-x-2">
                    <span className="text-xs-sm text-custom-gray-paragraph">
                      Create:
                    </span>
                    <div className="flex flex-wrap lg:flex-nowrap space-x-3 justify-end">
                      <AddItemButton
                        icon={
                          <div>
                            {WithTooltip(
                              "New Article",
                              <svg
                                className="w-4 h-4 xs:w-6 xs:h-6"
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
                      <AddItemButton
                        icon={
                          <div>
                            {WithTooltip(
                              "New Event",
                              <svg
                                className="w-4 h-4 xs:w-6 xs:h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7 2a1 1 0 0 0-1 1v1.001c-.961.014-1.34.129-1.721.333a2.272 2.272 0 0 0-.945.945C3.116 5.686 3 6.09 3 7.205v10.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h11.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.811.334-1.926V7.205c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945C19.34 4.13 18.961 4.015 18 4V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zM5 9v8.795c0 .427.019.694.049.849.012.06.017.074.049.134a.275.275 0 0 0 .124.125c.06.031.073.036.134.048.155.03.422.049.849.049h11.59c.427 0 .694-.019.849-.049a.353.353 0 0 0 .134-.049.275.275 0 0 0 .125-.124.353.353 0 0 0 .048-.134c.03-.155.049-.422.049-.849L19.004 9H5zm8.75 4a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5z"
                                  fill="#1D4ED8"
                                />
                              </svg>
                            )}
                          </div>
                        }
                        handleOnClick={handleToggleAddEventModal}
                        fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 xs:space-y-3">
                  <span className="text-xs font-medium text-center s:text-right w-full block">
                    Customize feed
                  </span>
                  <div className="flex flex-wrap space-x-1 xs:space-x-2 items-center justify-start xs:justify-end">
                    <span className="text-xs text-custom-gray-paragraph">
                      Content:
                    </span>
                    {["events", "articles"].map((contentType) => (
                      <div
                        onClick={() => handleMainFeedContentChange(contentType)}
                        key={contentType}
                        className={`${
                          mainFeedSettings.contentType ===
                          contentType.toLowerCase()
                            ? "bg-violet-100"
                            : ""
                        } text-xs capitalize cursor-pointer border hover:bg-violet-100 border-violet-500 text-violet-500 py-1 px-2 rounded`}
                      >
                        {contentType}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap space-x-1 xs:space-x-2 items-center justify-start sm:justify-end">
                    <span className="text-xs text-custom-gray-paragraph">
                      From:
                    </span>
                    {["following", "all"].map((contentTypeFrom) => (
                      <div
                        onClick={() =>
                          handleMainFeedContentFromChange(contentTypeFrom)
                        }
                        key={contentTypeFrom}
                        className={`${
                          mainFeedSettings.contentTypeFrom ===
                          contentTypeFrom.toLowerCase()
                            ? "bg-violet-100"
                            : ""
                        } text-xs capitalize cursor-pointer border hover:bg-violet-100 border-violet-500 text-violet-500 py-1 px-2 rounded`}
                      >
                        {contentTypeFrom}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {(eventsIsLoading || articlesIsLoading) && <SkeletonLoader />}
            {!(eventsIsLoading || articlesIsLoading) && (
              <div className="overflow-y-auto hide-scroll h-screen">
                {mainFeedSettings.contentType === "events" && (
                  <div className="space-y-3">
                    {events &&
                      events?.map((event) => {
                        return (
                          <div
                            key={event?.id}
                            className="w-full border border-gray-300 rounded-lg p-4 h-auto md:h-48"
                          >
                            <EventCardPreview event={event} />
                          </div>
                        );
                      })}
                    <PaginationComponent
                      data={events || []}
                      total={eventsTotal}
                      setPagination={setEventsPagination}
                      limit={eventsPagination.limit}
                      tag="events"
                    />
                  </div>
                )}
                {mainFeedSettings.contentType === "articles" && (
                  <div className="space-y-3">
                    {articles &&
                      articles?.map((article) => (
                        <div
                          key={article?.id}
                          className="w-full border border-gray-300 rounded-lg p-4 h-auto md:h-48"
                        >
                          <ArticleCardPreview article={article} />
                        </div>
                      ))}
                    <PaginationComponent
                      data={articles || []}
                      total={articlesTotal}
                      setPagination={setArticlesPagination}
                      limit={articlesPagination.limit}
                      tag="articles"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
      >
        <AddEventForm handleModalClose={handleToggleAddEventModal} />
      </AppModal>
      <AppModal
        title="Create Article"
        isOpen={addArticleModalIsOpen}
        onClose={() => handleToggleAddArticleModal()}
        width="w-full sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] xxl:w-[35%]"
      >
        <CreateArticleForm handleModalClose={handleToggleAddArticleModal} />
      </AppModal>
      <AppModal
        title="Following"
        isOpen={followingModalIsOpen}
        onClose={() => handleToggleFollowingModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {connectionsData?.following &&
              connectionsData?.following.map((follower: Connection) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = (connectionsData.following || [])
                    .map((following: Connection) => following.profile_id)
                    .includes(follower.profile_id);

                return (
                  <div
                    key={follower.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={follower.email}
                      currentUserProfileId={currentUser?.profile?.id}
                      name={follower.first_name + " " + follower.last_name}
                      title={follower.title || ""}
                      profile_id={follower.profile_id}
                      user_id={follower.user_id}
                      avatar={
                        follower.avatar || "/images/profile-placeholder.png"
                      }
                      hasFollowed={hasFollowed}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
      <AppModal
        title="Followers"
        isOpen={followersModalIsOpen}
        onClose={() => handleToggleFollowersModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {connectionsData?.followers &&
              connectionsData?.followers.map((follower: Connection) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = (connectionsData.following || [])
                    .map((following: Connection) => following.profile_id)
                    .includes(follower.profile_id);
                return (
                  <div
                    key={follower.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={follower.email}
                      currentUserProfileId={currentUser?.profile?.id}
                      name={follower.first_name + " " + follower.last_name}
                      title={follower.title || ""}
                      profile_id={follower.profile_id}
                      user_id={follower.user_id}
                      avatar={
                        follower.avatar || "/images/profile-placeholder.png"
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

export default MainFeed;
