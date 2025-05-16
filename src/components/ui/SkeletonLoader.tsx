import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-2 lg:space-y-4 p-2 lg:p-4 w-full">
      <div className="bg-gray-300 h-36 w-full rounded-lg"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const SkeletonCardPage = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-2 lg:space-y-4 p-2 lg:p-4 w-full">
      <div className="bg-gray-300 h-[400px] lg:h-[450px] w-full rounded-lg"></div>
    </div>
  );
};

export const SkeletonCardMin = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-2 lg:space-y-4 p-2 lg:p-4 w-full">
      <div className="space-y-2">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const SkeletonCardRounded = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-2 lg:space-y-4 p-2 lg:p-4 w-full">
      <div className="space-y-2">
        <div className="bg-gray-300 h-24 w-24 rounded-full"></div>
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export const SkeletonLoaderGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export const SkeletonLoaderMin = () => {
  return (
    <div className="flex flex-wrap gap-3 lg:gap-6">
      <SkeletonCardMin />
      <SkeletonCardMin />
      <SkeletonCardMin />
      <SkeletonCardMin />
      <SkeletonCardMin />
    </div>
  );
};

export const SkeletonLoaderPage = () => {
  return (
    <div>
      <SkeletonCardPage />
      <SkeletonCardMin />
      <SkeletonCardMin />
      <SkeletonCardMin />
    </div>
  );
};
