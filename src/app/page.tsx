import React from "react";
import Image from "next/image";

import HomeAuthControls from "@/components/ui/HomeAuthControls";
import { Toaster } from "react-hot-toast";
import HomeNav from "@/components/ui/HomeNav";

const riderText = [
  "Empowering developers with resources to elevate their careers.",
  "Stay ahead of the curve with curated articles and events.",
  "Unlock career-defining opportunities through knowledge and networking.",
  "Discover events that inspire growth and ignite innovation.",
  "Access expert insights to refine your skills and fuel your ambitions.",
  "Build your knowledge base with articles from industry leaders.",
  "Connect with a community of developers and learn together.",
  "Take your career to new heights with actionable insights and events.",
  "Find the right inspiration to turn your ideas into breakthroughs.",
  "Expand your horizons with events tailored for ambitious developers.",
];

interface HomeProps {
  searchParams: Record<string, string>;
  params: { slug?: string[] };
}

const Home: React.FC<HomeProps> = ({ searchParams, params }) => {
  const riderTextDisplayIndex = Math.floor(Math.random() * 10);
  const actionParam = searchParams?.action;
  const pathname = `/${params?.slug?.join("/") || ""}`;

  return (
    <>
      <div className="w-full">
        <header className="w-full min-h-screen py-4 bg-gradient-to-r from-blue-100 via-purple-100 to-white">
          <HomeNav actionParam={actionParam} pathname={pathname} />
          <div className="w-full min-h-[calc(100vh-10%)] flex mt-[2vw]">
            <div className="flex items-center flex-col w-11/12 lg:w-9/12 xl:w-10/12 mx-auto mt-[12%] lg:mt-[6%] 2xl:mt-[8%]">
              <div className="bg-blue-100 text-blue-600 text-md px-2 rounded flex space-x-1 items-center">
                <span>{riderText[riderTextDisplayIndex]}</span>
                <Image
                  src="/icons/work-color.svg"
                  width={15}
                  height={15}
                  alt="work"
                />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mt-2 mb-8 md:mb-10 lg:mb-10 text-gray-800">
                Join <span className="text-blue-700">TechGather</span> to{" "}
                <br></br>
                level up your <span className="text-blue-700">career</span>{" "}
                <br></br> get insights from{" "}
                <span className="text-blue-700">experts</span>
                <br></br> discover tech{" "}
                <span className="text-blue-700">events</span>
                <br></br> and unlock new{" "}
                <span className="text-blue-700">job opportunities</span>
              </div>
              <div className="mb-4 text-gray-500 w-full md:w-2/3 lg:w-1/2 text-center text-lg-xl">
                Connect with like-minded developers, uncover inspiring articles
                and events, and take your career to the next level—all in one
                dynamic platform
                <Image
                  src="/icons/celebration.svg"
                  width={16}
                  height={16}
                  alt="work"
                  className="ml-1 -mt-1 inline"
                />
              </div>
              <div className="mt-4 md:mt-6">
                <HomeAuthControls />
              </div>
            </div>
          </div>
        </header>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
