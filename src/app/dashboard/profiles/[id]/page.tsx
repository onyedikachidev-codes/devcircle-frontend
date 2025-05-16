"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { shallowEqual, useSelector } from "react-redux";

import { RootState } from "@/store";
// import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Profile } from "@/common/constants";
import { fetchProfile } from "@/api";
import { SkeletonLoaderPage } from "@/components/ui/SkeletonLoader";
// import { ProfilePreviewCard } from "@/components/ui/ProfileCardPreview";
import { ProfileCardMain } from "@/components/ui/ProfileCardMain";
import { getHasFollowed } from "@/lib/helpers";
import {
  selectConnectionsData,
  selectCurrentUser,
  // selectIsRecommendationsLoading,
  // selectProfilesRecommendations,
} from "@/lib/selectors";

export default function ProfilePage() {
  const {
    // isRecommendationsLoading,
    // profileRecommendations,
    connectionsData,
    user,
  } = useSelector(
    (state: RootState) => ({
      // isRecommendationsLoading: selectIsRecommendationsLoading(state),
      // profileRecommendations: selectProfilesRecommendations(state),
      user: selectCurrentUser(state),
      connectionsData: selectConnectionsData(state),
    }),
    shallowEqual
  );

  const params = useParams();
  const id = params?.id;

  const {
    refetch,
    data: profile,
    error,
    isLoading,
  } = useQuery<Profile, Error>({
    queryKey: ["profiles", id],
    queryFn: () => fetchProfile(id as string),
  });

  const isOwner = user?.profile?.id === profile?.id;
  const hasFollowed = getHasFollowed(connectionsData, profile?.id!);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-3 lg:p-6 lg:w-11/12 xl:w-9/12 mx-auto">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full rounded-lg">
          {isLoading && <SkeletonLoaderPage />}
          {!isLoading && profile && (
            <div className="w-full">
              <ProfileCardMain
                profile={profile}
                triggerRefetch={refetch}
                isOwner={isOwner}
                hasFollowed={hasFollowed}
              />
            </div>
          )}
        </div>
        {/* <aside className="w-4/12 space-y-5">
          {isRecommendationsLoading && <SkeletonCard />}
          {!isRecommendationsLoading && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-semibold mb-3 text-gray-700 text-base">
                Who to Follow
              </h3>
              <div className="space-y-4">
                {profileRecommendations &&
                  [...profileRecommendations]
                    .slice(0, 4)
                    .map((profile: Profile) => {
                      const hasFollowed = getHasFollowed(
                        connections.data,
                        profile.id
                      );

                      return (
                        <div
                          key={profile.id}
                          className="border-b border-b-gray-200 py-3"
                        >
                          <ProfilePreviewCard
                            name={profile.first_name + " " + profile.last_name}
                            title={profile.title}
                            profile_id={profile.id}
                            hasFollowed={hasFollowed}
                            user_id={profile.user_id}
                            avatar={profile.avatar || ""}
                          />
                        </div>
                      );
                    })}
              </div>
            </div>
          )}
        </aside> */}
      </div>
    </div>
  );
}
