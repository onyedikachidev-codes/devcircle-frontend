import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { AppDispatch, RootState } from "@/store";
import { followUser, unfollowUser } from "@/api";
import { fetchConnections } from "@/store/connections";
import { CustomError } from "@/lib/helpers/class";
import { errorToastWithCustomError } from "@/lib/helpers/toast";

interface JustFollowed {
  [key: string]: boolean;
}

export const useFollow = (handleCloseModal?: () => void) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [justFollowed, setJustFollowed] = useState<JustFollowed>({});
  const followMutation = useMutation({
    mutationFn: (profileId: string) => followUser(profileId),
    onSuccess: (data, profileId) => {
      setJustFollowed((prevState) => ({
        ...prevState,
        [profileId]: true,
      }));

      dispatch(fetchConnections());
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: (profileId: string) => unfollowUser(profileId),
    onSuccess: (data, profileId) => {
      setJustFollowed((prevState) => ({
        ...prevState,
        [profileId]: false,
      }));

      dispatch(fetchConnections());
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });

  const handleFollow = (profileId: string) => {
    followMutation.mutate(profileId);
  };

  const handleUnfollow = (profileId: string) => {
    unfollowMutation.mutate(profileId);
  };

  return {
    handleFollow,
    handleUnfollow,
    justFollowed,
  };
};
