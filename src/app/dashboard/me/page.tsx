"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { shallowEqual, useSelector } from "react-redux";

import { RootState } from "@/store";
import AppModal from "@/components/ui/Modal";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import AccountsSettings from "@/components/forms/AccountsSettings";
import { ProfileCardMain } from "@/components/ui/ProfileCardMain";
import { Profile } from "@/common/constants";
import { fetchProfile } from "@/api";
import { SkeletonLoaderPage } from "@/components/ui/SkeletonLoader";
import { getHasFollowed } from "@/lib/helpers";
import { selectConnectionsData, selectCurrentUser } from "@/lib/selectors";

export default function ProfilePage() {
  const { user, connectionsData } = useSelector(
    (state: RootState) => ({
      user: selectCurrentUser(state),
      connectionsData: selectConnectionsData(state),
    }),
    shallowEqual
  );
  const id = user.profile.id;

  const [accountsSettingsModalIsOpen, setAccountsSettingsModalIsOpen] =
    useState(false);
  const [updateProfileModalIsOpen, setUpdateProfileModalIsOpen] = useState(
    !!user.profile?.requires_update
  );

  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useQuery<Profile, Error>({
    queryKey: ["profiles", id],
    queryFn: () => fetchProfile(id as string),
    enabled: !!id,
  });
  const hasFollowed = getHasFollowed(connectionsData, profile?.id!);

  return (
    <div className="bg-white">
      <div className="min-h-screen w-full md:w-11/12 lg:w-10/12 bg-white mx-auto">
        {(isLoading || !profile) && <SkeletonLoaderPage />}
        {!isLoading && profile && (
          <div className="flex space-x-5 p-2 md:p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full rounded-lg">
              <div className="w-full relative">
                <ProfileCardMain
                  isOwner
                  profile={profile}
                  isMain
                  triggerRefetch={refetch}
                  hasFollowed={hasFollowed}
                  handleToggleAccountsSettingsModal={
                    setAccountsSettingsModalIsOpen
                  }
                  handleToggleUpdateProfileModal={setUpdateProfileModalIsOpen}
                />
              </div>
            </div>
          </div>
        )}
        <AppModal
          title={"Update Profile"}
          isOpen={updateProfileModalIsOpen}
          onClose={() => {
            setUpdateProfileModalIsOpen(false);
          }}
          width="w-full sm:w-[80%] md:w-[65%] lg:w-[55%] xl:w-[50%] xxl:w-[25%]"
        >
          <UpdateProfileForm
            handleModalClose={() => setUpdateProfileModalIsOpen(false)}
            triggerRefetch={refetch}
          />
        </AppModal>
        <AppModal
          title={"Account Settings"}
          isOpen={accountsSettingsModalIsOpen}
          onClose={() => {
            setAccountsSettingsModalIsOpen(false);
            setUpdateProfileModalIsOpen(false);
          }}
        >
          <AccountsSettings
            handleModalClose={() => setAccountsSettingsModalIsOpen(false)}
          />
        </AppModal>
      </div>
    </div>
  );
}
