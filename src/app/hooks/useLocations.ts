import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

import { Location } from "@/common/constants";

const fetchLocations = async (): Promise<Location[]> => {
  const result = await axiosInstance.get("/api/proxy/locations");

  return result.data?.data;
};

export const useLocations = () => {
  return useQuery<Location[], Error>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: Infinity,
    cacheTime: Infinity,
    // refetchOnWindowFocus: false,
  } as UseQueryOptions<Location[], Error>);
};
