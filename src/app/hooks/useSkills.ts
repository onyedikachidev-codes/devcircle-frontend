import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

import { Skill } from "@/common/constants";

const fetchSkills = async (): Promise<Skill[]> => {
  const result = await axiosInstance.get("/api/proxy/skills");

  return result.data?.data;
};

export const useSkills = () => {
  return useQuery<Skill[], Error>({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: Infinity,
    cacheTime: Infinity,
    // refetchOnWindowFocus: false,
  } as UseQueryOptions<Skill[], Error>);
};
