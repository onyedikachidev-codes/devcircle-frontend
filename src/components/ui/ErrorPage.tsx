import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoWithText from "./LogoWithText";

interface IErrorPageProps {
  useLayout?: boolean;
  type?: "dashboard" | "page";
}

const ErrorPage: React.FC<IErrorPageProps> = ({ useLayout, type }) => {
  return (
    <div
      className={`flex flex-col w-full h-screen ${
        type !== "dashboard"
          ? "bg-gradient-to-r from-blue-100 via-purple-100 to-white"
          : "bg-white"
      }`}
    >
      {useLayout && (
        <nav className="flex justify-between items-center px-2 lg:px-6 py-3">
          <ul>
            <li className="hover:scale-110 transform transition duration-300">
              <LogoWithText />
            </li>
          </ul>
        </nav>
      )}
      <div className="flex-grow w-full flex flex-col justify-center relative">
        <div className="w-11/12 sm:w-10/12 lg:w-7/12 mx-auto space-y-2 sm:space-y-3">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-app-semibold text-blue-700">
            Oops! Something Went Wrong
          </div>
          <div className="text-gray-500 text-base xl:text-lg-xl break-all">
            An unexpected error occurred, and we couldn’t display the page.
          </div>
          <div className="text-gray-500 text-base xl:text-lg-xl break-all">
            Please try refreshing, or head back to the{" "}
            <Link href="/" className="text-blue-700 font-medium">
              homepage
            </Link>{" "}
            If the issue persists, feel free to{" "}
            <Link
              href="mailto:support@TechGather.io"
              className="text-blue-700 font-medium"
            >
              contact
            </Link>{" "}
            our support team for assistance.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
