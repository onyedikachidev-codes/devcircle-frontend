"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { shallowEqual, useSelector } from "react-redux";

import ContentWrapper from "@/components/ui/ContentWrapper";
import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddEventForm from "@/components/forms/EventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import {
  Event,
  IPagination,
  IFilters,
  EventWithPagination,
} from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { RootState } from "@/store";
import {
  SkeletonLoaderGrid,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";
import { selectCurrentUser } from "@/lib/selectors";

const fetchEvents = async (
  pagination: IPagination,
  filters: IFilters
): Promise<EventWithPagination> => {
  try {
    const { type, ...rest } = filters;

    const response = await axiosInstance.get("/api/proxy/events", {
      params: {
        contentType: "user",
        ...pagination,
        ...rest,
        eventType: type,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Events() {
  const user = useSelector(
    (state: RootState) => selectCurrentUser(state),
    shallowEqual
  );
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    startDate: "",
    endDate: "",
    order: "DESC",
    sortBy: "",
  });

  const {
    data: eventsData,
    error,
    isLoading,
    refetch,
  } = useQuery<EventWithPagination, Error>({
    queryKey: ["events", user?.profile?.id, pagination],
    queryFn: () => fetchEvents(pagination, filters as IFilters),
    placeholderData: keepPreviousData,
  });

  let events;
  let total = 0;

  if (eventsData) {
    const { total: pageTotal } = eventsData;
    events = eventsData.data;
    total = pageTotal;
  }

  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = () => {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  };

  return (
    <div className="min-h-screen w-full bg-white p-1 lg:p-6">
      <div className="flex w-full space-x-0 md:space-x-5">
        <div className="w-full min-h-screen px-2 s:px-5 md:px-10 lg:px-20">
          <div className="relative">
            <DashboardPageHeader
              title="Discover Events to Connect and Collaborate with Top Talent"
              description="Explore events where innovators, creators, and skilled professionals come together. Whether you're seeking collaboration opportunities or looking to grow your network, find the perfect event to connect with individuals who share your vision and expertise."
            />
            <div className="absolute top-3 right-3">
              <AddItemButton
                icon={
                  <div>
                    {WithTooltip(
                      "New Event",
                      <svg
                        className="w-6 h-6"
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
          <div className="py-5 flex flex-col space-y-5 w-full">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                typeOptions: [
                  { value: "onsite", label: "Onsite" },
                  {
                    value: "hybrid",
                    label: "Hybrid",
                  },
                  {
                    value: "virtual",
                    label: "Virtual",
                  },
                ],
                sortByOptions: [
                  {
                    value: "start_date",
                    label: "Start Date",
                  },
                  { value: "views", label: "Views" },
                ],
              }}
            />
            {!isLoading && (
              <ContentWrapper data={events as Event[]}>
                {eventsData &&
                  events?.map((event: Event) => (
                    <div
                      key={event.id}
                      className="w-full border border-gray-300 rounded-lg p-4 h-48"
                    >
                      <EventCardPreview event={event} />
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
            {!isLoading && eventsData && events && (
              <PaginationComponent
                data={events}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
                tag="events"
              />
            )}
          </div>
        </div>
      </div>
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
      >
        <AddEventForm />
      </AppModal>
    </div>
  );
}
