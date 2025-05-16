import { useRef } from "react";
import {
  Event,
  Profile,
  Job,
  Article,
  Notification,
  IPagination,
} from "@/common/constants";

interface IPaginationComponentProps {
  count?: number;
  data: Event[] | Profile[] | Job[] | Article[] | Notification[];
  total: number;
  setPagination: any;
  limit: number;
  tag?: string;
  setPage?: boolean;
}

const PaginationComponent: React.FC<IPaginationComponentProps> = ({
  count,
  data,
  total,
  setPagination,
  limit,
  tag,
  setPage,
}) => {
  const paginationRef = useRef<{ page: number; limit: number }>({
    page: 1,
    limit,
  });
  const fixedPagination = paginationRef.current;

  return (
    <div className="w-full flex items-center justify-center">
      <button
        disabled={count ? count === total : data?.length === total}
        onClick={() =>
          setPagination((prev: IPagination) => ({
            page: setPage ? prev.page + fixedPagination.page : prev.page,
            limit: !setPage ? prev.limit + fixedPagination.limit : prev.limit,
          }))
        }
        className="cursor-pointer p-2 text-xs-sm border text-gray-700 border-gray-300 bg-slate-50 rounded"
      >
        {(count ? count < total : data?.length < total)
          ? "Load more" + " " + tag
          : "You have reached the end"}
      </button>
    </div>
  );
};

export default PaginationComponent;
