"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import AppModal from "@/components/ui/Modal";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import CreateJobForm from "@/components/forms/JobForm";
import { JobCard } from "@/components/ui/JobCard";
import axiosInstance from "@/lib/axiosInstance";
import PaginationComponent from "@/components/ui/PaginationComponent";
import FilterComponent from "@/components/ui/Filter";
import {
  Job,
  JobsWithPagination,
  Skill,
  IFilters,
  IPagination,
} from "@/common/constants";
import { useSkills } from "@/app/hooks/useSkills";
import ContentWrapper from "@/components/ui/ContentWrapper";
import { WithTooltip } from "@/components/ui/WithTooltip";
import AddItemButton from "@/components/ui/AddItemButton";
import {
  SkeletonLoaderGrid,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";

const fetchJobs = async (
  pagination: IPagination,
  filters: IFilters
): Promise<JobsWithPagination> => {
  const { skills, ...rest } = filters;

  try {
    const response = await axiosInstance.get("/api/proxy/jobs", {
      params: {
        contentType: "all",
        ...pagination,
        ...rest,
        ...(skills && { skills: [skills] }),
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Jobs() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    skills: "",
    order: "DESC",
    sortBy: "",
  });
  const {
    data: jobsData,
    error,
    isLoading,
    refetch,
  } = useQuery<JobsWithPagination, Error>({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs(pagination, filters as any),
    placeholderData: keepPreviousData,
  });
  const [addJobModalIsOpen, setAddJobModalIsOpen] = useState<boolean>(false);
  const { data: skills } = useSkills();

  const handleToggleAddJobModal = () => {
    setAddJobModalIsOpen(!addJobModalIsOpen);
  };

  let jobs: Job[] = [];
  let total = 0;

  if (jobsData) {
    const { total: pagesTotal } = jobsData;
    jobs = jobsData.data;
    total = pagesTotal;
  }
  const skillsOptions = (skills || [])?.map((skill: Skill) => {
    return { value: skill.title, label: skill.title };
  });

  return (
    <div className="min-h-screen w-full bg-white p-1 lg:p-6">
      <div className="flex w-full space-x-0 md:space-x-5">
        <div className="w-full min-h-screen px-2 s:px-5 md:px-10 lg:px-20">
          <div className="relative">
            <DashboardPageHeader
              title="Find Opportunities and Jobs to Accelerate Your Career"
              description="Explore job openings and collaboration opportunities tailored to your skills and interests. Whether you're seeking full-time positions or freelance jobs, connect with companies and teams looking for talent like yours. Take the next step in your career by finding the right opportunity today."
            />
            <div className="absolute top-3 right-3">
              <AddItemButton
                icon={
                  <div>
                    {WithTooltip(
                      "New Job",
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 512 512"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <title>work-case-filled</title>
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="work-case"
                            fill="#1D4ED8"
                            transform="translate(42.666667, 64.000000)"
                          >
                            <path
                              d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"
                              id="Combined-Shape-Copy"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    )}
                  </div>
                }
                handleOnClick={handleToggleAddJobModal}
                fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
              />
            </div>
          </div>
          <div className="h-14 py-5 flex flex-col space-y-5 w-full">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                skillsOptions,
                statusOptions: [
                  { value: "hiring", label: "Hiring" },
                  { value: "paused", label: "Paused" },
                  { value: "closed", label: "Closed" },
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
              <ContentWrapper data={jobs as Job[]}>
                {jobsData &&
                  jobs?.map((job: Job) => (
                    <div
                      key={job.id}
                      className="border border-gray-300 p-2 md:p-3 rounded-lg"
                    >
                      <JobCard job={job} />
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
            {!isLoading && jobsData && jobs && (
              <PaginationComponent
                data={jobs}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
                tag="jobs"
              />
            )}
          </div>
        </div>
      </div>
      <AppModal
        title="Create Job"
        isOpen={addJobModalIsOpen}
        onClose={() => handleToggleAddJobModal()}
      >
        <CreateJobForm
          triggerRefetch={refetch}
          handleModalClose={handleToggleAddJobModal}
        />
      </AppModal>
    </div>
  );
}
