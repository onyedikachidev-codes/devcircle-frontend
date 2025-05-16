import Image from "next/image";

import { WithTooltip } from "./WithTooltip";

export const ViewsComponent = ({ views }: { views: number }) => {
  return (
    <div className="flex space-x-1 items-center">
      {WithTooltip(
        "views",
        <Image src="/icons/eye-open.svg" alt="" width={20} height={20} />
      )}
      <span className="text-xs-sm text-gray-600">{views}</span>
    </div>
  );
};
