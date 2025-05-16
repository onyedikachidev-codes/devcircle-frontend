import React from "react";

import ContactForm from "@/components/forms/ContactForm";
import HomeNav from "@/components/ui/HomeNav";

const NotFoundPage: React.FC = ({ searchParams, params }: any) => {
  const actionParam = searchParams?.action;
  const pathname = `/${params?.slug?.join("/") || ""}`;

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <header className="w-full border-b border-b-gray-200 py-4 bg-white">
        <HomeNav actionParam={actionParam} pathname={pathname} />
      </header>
      <div className="flex-grow w-full flex flex-col justify-center relative">
        <div className="w-11/12 sm:w-10/12 lg:w-7/12 mx-auto space-y-2 sm:space-y-3">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-app-semibold text-blue-700">
            Say hello!
          </div>
          <div className="text-gray-500 text-base sm:text-lg-xl break-all">
            Let us know what you need, we’ll get back to you as soon as we can!
          </div>
          <div className="w-full md:w-[75%]">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
