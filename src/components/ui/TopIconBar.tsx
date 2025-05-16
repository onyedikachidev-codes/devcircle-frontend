import React from "react";

const TopIconBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-end space-x-2 pb-2 xs:pb-0">
      {children}
    </div>
  );
};

export default TopIconBar;
