import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

import NativeSelect from "../forms/NativeSelectComponent";
import { IFilters } from "@/common/constants";
import Input from "../forms/Input";
import { WithTooltip } from "./WithTooltip";

interface SortByProps {
  options: Option[];
  filters: IFilters;
  triggerRefetch: () => void;
  setFilters: (filters: IFilters) => void;
}

const SortBy: React.FC<SortByProps> = ({
  filters,
  options,
  triggerRefetch,
  setFilters,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sortBy: e.target.value });

    setTimeout(() => {
      triggerRefetch();
    }, 0);
  };

  return (
    <div className="relative">
      <select
        value={filters?.sortBy}
        onChange={handleSortChange}
        className="block w-auto xxs:w-32 text-gray-700 pl-2 md:pl-3 pr-6 md:pr-10 py-2 md:py-3 text-sm appearance-none border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg md:rounded-xl"
      >
        <option value="">Sort By</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-700">
        <svg
          fill="currentColor"
          className="w-4 h-4"
          viewBox="0 0 35 35"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.42,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,0,1,2.5,0V33.19A1.25,1.25,0,0,1,5.42,34.44Z" />
          <path d="M9.34,27.41H1.5a1.25,1.25,0,0,1,0-2.5H9.34a1.25,1.25,0,0,1,0,2.5Z" />
          <path d="M29.58,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,1,1,2.5,0V33.19A1.25,1.25,0,0,1,29.58,34.44Z" />
          <path d="M33.5,27.41H25.66a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z" />
          <path d="M17.5,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,1,1,2.5,0V33.19A1.25,1.25,0,0,1,17.5,34.44Z" />
          <path d="M21.42,10.09H13.58a1.25,1.25,0,0,1,0-2.5h7.84a1.25,1.25,0,0,1,0,2.5Z" />
        </svg>
      </div>
    </div>
  );
};

interface DatePickerInputProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  selectedDate,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        className="block w-auto xxs:w-36 text-gray-700 pl-10 pr-2 py-2 md:py-3 text-sm appearance-none border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg md:rounded-xl"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Image
          src="/icons/calendar.svg"
          alt="Calendar Icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

interface Option {
  value: string;
  label: string;
}

interface IFilterComponentProps {
  filters: IFilters;
  setFilters: any;
  options?: { [key: string]: Option[] };
  triggerRefetch?: any;
}

const FilterComponent: React.FC<IFilterComponentProps> = ({
  filters,
  setFilters,
  options,
  triggerRefetch,
}) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const filterFields = Object.keys(filters);
  const handleFiltersChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRefetchWithFilters = () => {
    triggerRefetch();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFiltersVisible(true);
      } else {
        setIsFiltersVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="md:hidden mb-1">
        <button
          className="text-blue-600 text-sm font-app-normal"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {isFiltersVisible && (
        <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 justify-normal items-start md:justify-between">
          <div className="flex gap-2 md:space-x-0 md:flex-row flex-wrap md:items-center md:gap-2">
            {filterFields.includes("keyword") && (
              <div className="w-auto md:w-72">
                <Input
                  id="keyword"
                  type="string"
                  placeholder="Keyword..."
                  value={filters.keyword as string}
                  onChange={(e: any) => handleFiltersChange(e)}
                />
              </div>
            )}
            {filterFields.includes("skills") && options?.statusOptions && (
              <NativeSelect
                id="skills"
                placeholder="Filter by Skill"
                value={filters.skills as string}
                onChange={(e) => handleFiltersChange(e)}
                options={options?.skillsOptions as Option[]}
                limitWidth
              />
            )}
            {filterFields.includes("status") && options?.statusOptions && (
              <NativeSelect
                id="status"
                placeholder="Select Status"
                value={filters.status as string}
                onChange={(e) => handleFiltersChange(e)}
                options={options?.statusOptions as Option[]}
                limitWidth
              />
            )}
            {filterFields.includes("type") && options?.typeOptions && (
              <NativeSelect
                id="type"
                placeholder="Select Type"
                value={filters.type as string}
                onChange={(e) => handleFiltersChange(e)}
                options={options.typeOptions as Option[]}
                limitWidth
              />
            )}
            {filterFields.includes("createdAt") && (
              <DatePickerInput
                selectedDate={filters.createdAt as any}
                onChange={(e: any) => {
                  handleFiltersChange({
                    target: {
                      name: "createdAt",
                      value: e,
                    },
                  });
                }}
                placeholder="Date Posted"
              />
            )}
            <div className="flex space-x-2 items-center">
              {filterFields.includes("startDate") && (
                <DatePickerInput
                  selectedDate={filters.startDate as any}
                  onChange={(e: any) => {
                    handleFiltersChange({
                      target: {
                        name: "startDate",
                        value: e,
                      },
                    });
                  }}
                  placeholder="Start Date"
                />
              )}
              {filterFields.includes("endDate") && (
                <DatePickerInput
                  selectedDate={filters.endDate as any}
                  onChange={(e: any) => {
                    handleFiltersChange({
                      target: {
                        name: "endDate",
                        value: e,
                      },
                    });
                  }}
                  placeholder="End Date"
                />
              )}
            </div>
            {WithTooltip(
              "Filter",
              <button
                onClick={handleRefetchWithFilters}
                className="px-3 py-2.5 md:py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              >
                <svg
                  fill="#ffffff"
                  className="w-4 h-4"
                  viewBox="0 0 1920 1920"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m0 .011 741.97 984.808v673.566l502.665 251.332V984.82l675.332-896.544-88.154-66.308-697.508 925.891v783.345L852.301 1590.2V947.858L221.322 110.341h1262.289V.011z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          {options?.sortByOptions && (
            <div>
              <SortBy
                triggerRefetch={triggerRefetch}
                filters={filters}
                options={options?.sortByOptions!}
                setFilters={setFilters}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
