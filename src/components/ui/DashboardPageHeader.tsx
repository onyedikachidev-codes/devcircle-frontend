import React from "react";
import Image from "next/image";

interface IDashboardPageHeaderProps {
  title: string;
  description: string;
}

const DashboardPageHeader: React.FC<IDashboardPageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="hidden md:flex w-full flex-col justify-center space-y-5 min-h-28 bg-gradient-to-r from-blue-100 via-purple-100 to-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-app-medium text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2 text-sm w-2/3">{description}</p>
    </div>
  );
};

export default DashboardPageHeader;

interface IDashboardPageSecondaryHeaderProps {
  title: string;
  description: string;
}

export const DashboardPageSecondaryHeader: React.FC<
  IDashboardPageSecondaryHeaderProps
> = ({ title, description }) => {
  return (
    <div className="hidden w-full md:flex flex-col justify-center space-y-5 bg-gradient-to-r from-blue-100 via-purple-100 to-white px-3 py-3 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <span className="text-sm">Go back</span>
        <h2 className="text-2xl font-semibold text-gray-800">Event</h2>
      </div>

      {/* <p className="text-gray-600 mt-2 text-sm w-1/2">{description}</p> */}
    </div>
  );
};
