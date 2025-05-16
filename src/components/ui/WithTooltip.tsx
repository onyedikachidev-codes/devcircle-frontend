import React from "react";

export const WithTooltip = (text: string, children: React.ReactNode) => {
  return (
    <div className="relative group cursor-pointer">
      {children}
      <span className="first-letter:capitalize w-auto whitespace-nowrap hidden absolute -bottom-9 left-0 text-xs text-gray-700 bg-gray-300 px-2 py-1 rounded group-hover:block">
        {text}
      </span>
    </div>
  );
};
