"use client";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import Link from "next/link";

import { fetchCurrentUser } from "@/store/user";
import { fetchRecommendations } from "@/store/recommendations";
import { useRouter } from "next/navigation";

interface IPageReloadProps {
  userError: string | null;
  recommendationsError: string | null;
}

const PageReload: React.FC<IPageReloadProps> = ({
  userError,
  recommendationsError,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-grow w-full flex flex-col justify-center relative">
        <div className="w-11/12 sm:w-10/12 lg:w-7/12 mx-auto space-y-2 sm:space-y-3">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-app-semibold text-blue-700">
            Yikes!
          </div>
          <div className="text-gray-500 text-base sm:text-lg-xl break-all">
            It looks like we couldn’t render this page.
          </div>
          <div className="text-gray-500 text-base sm:text-lg-xl break-all">
            Please reload or{" "}
            <Link
              href="mailto:support@TechGather.io"
              className="text-blue-700 font-medium"
            >
              contact us
            </Link>{" "}
            if you need further assistance.
          </div>
          <div>
            <button
              className="bg-blue-700 text-white px-3 py-2 rounded"
              onClick={() => {
                if (userError) dispatch(fetchCurrentUser());
                if (recommendationsError) dispatch(fetchRecommendations());

                if (typeof window !== "undefined") window.location.reload();
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageReload;
