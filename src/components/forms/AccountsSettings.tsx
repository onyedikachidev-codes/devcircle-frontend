import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { shallowEqual, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RootState } from "@/store";
import axiosInstance from "@/lib/axiosInstance";
import Input from "./Input";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { CustomError } from "@/lib/helpers/class";
import { selectCurrentUser } from "@/lib/selectors";

const schema = yup.object().shape({
  old_password: yup.string().required("Old password is required"),
  new_password: yup.string().required("Old password is required"),
});

const handleChangePassword = async (data: {
  old_password: string;
  new_password: string;
}) => {
  const response = await axiosInstance.patch(
    `/api/proxy/auth/change-password`,
    data
  );

  return response.data.data;
};

interface IAccountSettingsFormProps {
  handleModalClose?: () => void;
}

const AccountSettingsForm: React.FC<IAccountSettingsFormProps> = ({
  handleModalClose,
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const user = useSelector(
    (state: RootState) => selectCurrentUser(state),
    shallowEqual
  );

  const [loading, setLoading] = useState(false);
  const passwordChangeMutation = useMutation({
    mutationFn: (data: { old_password: string; new_password: string }) =>
      handleChangePassword(data),
    onSuccess: (data: any) => {
      successToast("Account settings updated successfully");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled(data, error, variables, context) {
      setLoading(false);
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  // const [notificationSettings, setNotificationSettings] =
  //   useState<NotificationSettings>({
  //     emailNotifications: true,
  //     smsNotifications: false,
  //     pushNotifications: true,
  //   });

  // const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setNotificationSettings((prev: any) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  const onSubmit = (data: any) => {
    setLoading(true);

    (async function () {
      await passwordChangeMutation.mutate(data);
    })();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-4xl mx-auto"
      >
        <div>
          <Input
            id="email"
            label="Email"
            // placeholder="Kayode"
            value={user?.email}
          />
        </div>
        <div>
          <h2 className="font-medium mb-4">Reset Password</h2>
          <div className="mb-3">
            <Input
              id="old_password"
              label="Old Password"
              placeholder=""
              value={watch("old_password")}
              onChange={(e) => setValue("old_password", e.target.value)}
              error={errors.old_password?.message as string}
              otherClasses={methods.register("old_password")}
            />
          </div>
          <div>
            <Input
              id="new_password"
              label="New Password"
              placeholder=""
              value={watch("new_password")}
              onChange={(e) => setValue("new_password", e.target.value)}
              error={errors.new_password?.message as string}
              otherClasses={methods.register("new_password")}
            />
          </div>
        </div>
        {/* <div>
          <h2 className="font-medium mb-4">Localization</h2>
          <p className="text-sm text-custom-gray-paragraph mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            sit sint? Deserunt expedita eligendi.
          </p>
          <div>
            <Input
              id="first_name"
              label="Country/Region"
              placeholder="Kayode"
              value={watch("first_name")}
              onChange={(e) => setValue("first_name", e.target.value)}
              error={errors.first_name?.message}
              otherClasses={methods.register("first_name")}
            />
          </div>
        </div> */}
        {/* <div>
          <h2 className="font-medium mb-4">Notification Settings</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">SMS Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={notificationSettings.pushNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Push Notifications</span>
            </label>
          </div>
        </div> */}
        <div className="flex items-center space-x-2 justify-end">
          <button
            onClick={() => handleModalClose && handleModalClose()}
            type="button"
            className="px-6 py-2 text-sm bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AccountSettingsForm;
