import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";

import { RootState } from "@/store";
import ReactSelectComponent from "./ReactSelectComponent";
import Input from "./Input";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axiosInstance";
import { Option, Profile, Skill } from "@/common/constants";
import { AppDispatch } from "@/store";
import { updateProfile } from "@/store/user";
import TextArea from "./TextArea";
import { WithTooltip } from "../ui/WithTooltip";
import {
  getFilenameAndExtension,
  sanitizeFile,
  serializeData,
} from "@/lib/helpers";
import NativeSelect from "./NativeSelectComponent";
import { useSkills } from "@/app/hooks/useSkills";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import { CustomError } from "@/lib/helpers/class";

import "react-quill/dist/quill.snow.css";
import "../../app/globals.css";
import { useLocations } from "@/app/hooks/useLocations";
import InputWithDropdown from "./InputWithDropdown";
import { selectCurrentUser } from "@/lib/selectors";
import AvatarComponent from "../ui/AvatarComponent";

export enum ProfileStatus {
  HIRING = "hiring",
  JOB_HUNTING = "looking for work",
}

const schema = yup.object().shape({
  avatar: yup.string(),
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 10 characters")
    .max(50, "Title must not exceed 50 characters"),
  heading: yup
    .string()
    .min(3, "Heading must be at least 10 characters")
    .max(150, "Heading must not exceed 150 characters"),
  bio: yup
    .string()
    .min(3, "Bio must be at least 10 characters")
    .max(2000, "Bio must not exceed 2000 characters"),
  location: yup.string(),
  status: yup.string(),
  phone: yup
    .string()
    .matches(
      /^\+\d{1,14}$/,
      "Phone number must be in international format (+1234567890)"
    ),
  website: yup.string().url("Must be a valid URL"),
  linkedin: yup.string().url("Must be a valid URL"),
  github: yup.string().url("Must be a valid URL"),
  resume: yup.string(),
  languages: yup
    .array()
    .of(yup.mixed().required("Language is required"))
    .min(1, "At least one language is required")
    .required("Languages are required"),
  skills: yup
    .array()
    .of(yup.mixed().required("Skill is required"))
    .min(1, "At least one skill is required")
    .required("Skills are required"),
  is_mentor: yup.boolean(),
  mentor_note: yup.string().when("is_mentor", {
    is: true,
    then: (schema) => schema.required("Mentor note is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const handleUpdateProfile = async (
  profileId: string,
  data: Partial<Profile>
) => {
  const response = await axiosInstance.put(
    `/api/proxy/profiles/${profileId}`,
    data
  );

  return response.data.data;
};

interface IUpdateProfileFormProps {
  handleModalClose: () => void;
  triggerRefetch: () => void;
}

const UpdateProfileForm: React.FC<IUpdateProfileFormProps> = ({
  handleModalClose,
  triggerRefetch,
}) => {
  const user = useSelector(
    (state: RootState) => selectCurrentUser(state),
    shallowEqual
  );
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    avatar: user?.profile?.avatar || "",
    title: user?.profile?.title || "",
    heading: user?.profile?.heading || "",
    bio: user?.profile?.bio || "",
    location: user?.profile?.location || "",
    phone: user?.profile?.phone || "",
    website: user?.profile?.website || "",
    linkedin: user?.profile?.linkedin || "",
    github: user?.profile?.github || "",
    resume: user?.profile?.resume || "",
    languages:
      user?.profile?.languages?.map((lang) => ({
        value: lang,
        label: lang,
      })) || [],
    skills:
      user?.profile?.skills?.map((skill) => ({
        value: skill.title,
        label: skill.title,
      })) || [],
    is_mentor: user?.profile.is_mentor || false,
    mentor_note: user?.profile.mentor_note || "",
    status: user?.profile.status || "",
  };
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { data: skills } = useSkills();
  const { data: locations } = useLocations();
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const [deletedResume, setDeletedResume] = useState(false);
  const [deletedAvatar, setDeletedAvatar] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: ({
      profileId,
      data,
    }: {
      profileId: string;
      data: Partial<Profile>;
    }) => handleUpdateProfile(profileId, data),
    onSuccess: (data: Profile) => {
      successToast(feedbackTextMapper.update("Profile"));

      dispatch(updateProfile(data));
      triggerRefetch();
      handleModalClose();
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const languagesOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
  ];

  const profileStatusOptions = [
    { value: "hiring", label: "Hiring" },
    {
      value: "looking for work",
      label: "Looking for work",
    },
  ];

  const skillsOptions = (skills || [])?.map((skill) => {
    return { value: skill.title, label: skill.title };
  });

  const locationsOptions = (locations || [])?.map((location) => {
    return {
      value: location.city + ", " + location.country,
      label: location.city + ", " + location.country,
    };
  });

  const handleAvatarDrop = (acceptedFiles: File[]) => {
    setFileUploadLoading(true);

    const sanitizedFile = sanitizeFile(acceptedFiles[0]);
    setAvatar(sanitizedFile);

    (async function () {
      const formData = new FormData();
      formData.append("file", sanitizedFile);

      const result = await axiosInstance.post(
        "/api/proxy/files/upload/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileUploadLoading(false);
      setValue("avatar", result?.data?.data?.url);
    })();
  };

  const handleResumeDrop = (acceptedFiles: File[]) => {
    setFileUploadLoading(true);
    const sanitizedFile = sanitizeFile(acceptedFiles[0]);

    setResume(sanitizedFile);

    (async function () {
      const formData = new FormData();
      formData.append("file", sanitizedFile);

      const result = await axiosInstance.post(
        "/api/proxy/files/upload/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileUploadLoading(false);
      setValue("resume", result?.data?.data?.url);
    })();
  };

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({
    onDrop: handleAvatarDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const {
    getRootProps: getResumeRootProps,
    getInputProps: getResumeInputProps,
  } = useDropzone({
    onDrop: handleResumeDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxFiles: 1,
  });

  const onSubmit: any = (data: any) => {
    setLoading(true);
    const formattedData = serializeData(data);

    const profileData = {
      ...formattedData,
      languages: data?.languages.map((l: Option) => l.value),
      skills: data?.skills.map((s: Option) => ({ title: s.label })),
      location: data.location.value,
    };

    (async function () {
      try {
        await updateProfileMutation.mutate({
          profileId: user?.profile.id,
          data: profileData,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-4xl mx-auto"
      >
        <div>
          <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-3">
            <div className="flex items-center space-x-7">
              <div className="relative">
                <AvatarComponent
                  avatar={
                    !deletedAvatar && user?.profile?.avatar
                      ? user?.profile?.avatar
                      : "/images/profile-placeholder.png"
                  }
                  className="w-20 h-20"
                />
                <div className="absolute bottom-0 -right-1">
                  {WithTooltip(
                    "Remove",
                    <span
                      onClick={() => {
                        setValue("avatar", "");
                        setDeletedAvatar(true);
                      }}
                    >
                      <Image
                        src="/icons/bin.svg"
                        width={15}
                        height={15}
                        alt="file icon"
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">
                  {user.profile?.first_name + " " + user.profile?.last_name}
                </span>
                <span className="text-sm text-custom-gray-paragraph">
                  {user.profile?.title}
                </span>
              </div>
            </div>
          </div>
          <div className="py-3">
            <label className="block text-gray-700 text-sm">
              Avatar (.png, .jpg, .jpeg)
            </label>
            <div
              {...getAvatarRootProps()}
              className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
            >
              <input {...getAvatarInputProps()} />
              {avatar ? (
                <p>{avatar.name}</p>
              ) : (
                <p>Drag and drop an image, or click to select an avatar</p>
              )}
            </div>
            {errors.avatar && (
              <p className="text-xs-sm text-red-500 first-letter:capitalize">
                {errors.avatar?.message}
              </p>
            )}
          </div>
        </div>
        <Input
          id="title"
          label={`Title (${watch("title").length}/50)`}
          value={watch("title")}
          onChange={(e) => setValue("title", e.target.value)}
          error={errors.title?.message as string}
          otherClasses={methods.register("title")}
          required
        />
        <Input
          id="heading"
          label={`Heading (${watch("heading")!.length}/150)`}
          value={watch("heading")}
          onChange={(e) => setValue("heading", e.target.value)}
          error={errors.heading?.message as string}
          otherClasses={methods.register("heading")}
        />
        <TextArea
          id="bio"
          label={`Bio (${watch("bio")!.length}/2000)`}
          value={watch("bio") as string}
          onChange={(e) => setValue("bio", e.target.value)}
          error={errors.bio?.message as string}
          otherClasses={methods.register("bio")}
        />
        <div className="grid grid-cols-2 gap-6">
          <Input
            id="phone"
            label="Phone"
            placeholder="e.g +23490312345678"
            type="text"
            value={watch("phone") as string}
            onChange={(e) => setValue("phone", e.target.value)}
            error={errors.phone?.message as string}
            otherClasses={methods.register("phone")}
          />
          <Input
            id="website"
            label="Website"
            type="url"
            placeholder="https://website.com"
            value={watch("website") as string}
            onChange={(e) => setValue("website", e.target.value)}
            error={errors.website?.message as string}
            otherClasses={methods.register("website")}
          />
        </div>
        <InputWithDropdown
          id="location"
          label="Location"
          value={watch("location") as string}
          setValue={setValue}
          options={locationsOptions}
          error={errors.location?.message as string}
          otherClasses={methods.register("location")}
          required
        />
        <div className="grid grid-cols-2 gap-6">
          <Input
            id="linkedin"
            label="LinkedIn"
            type="url"
            placeholder="https://linkedin.com"
            value={watch("linkedin") as string}
            onChange={(e) => setValue("linkedin", e.target.value)}
            error={errors.linkedin?.message as string}
            otherClasses={methods.register("linkedin")}
          />
          <Input
            id="github"
            label="GitHub"
            placeholder="https://github.com"
            type="url"
            value={watch("github") as string}
            onChange={(e) => setValue("github", e.target.value)}
            error={errors.github?.message as string}
            otherClasses={methods.register("github")}
          />
        </div>
        <div>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <ReactSelectComponent
                tag="languages"
                label="Languages"
                options={languagesOptions}
                placeholder="Select languages"
                error={errors.languages?.message as string}
                setSelectedOption={setValue}
                selectedOption={watch("languages") as Option[]}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <ReactSelectComponent
                tag="skills"
                label="Skills"
                options={skillsOptions}
                placeholder="Select skills"
                error={errors.skills?.message as string}
                setSelectedOption={setValue}
                selectedOption={watch("skills") as Option[]}
              />
            )}
          />
        </div>
        <NativeSelect
          id="status"
          label="What are you up to?"
          placeholder="Select Status"
          value={watch("status") as string}
          onChange={(e) => setValue("status", e.target.value)}
          error={errors?.status?.message}
          options={profileStatusOptions}
          otherClasses={methods.register("status")}
        />
        <div className="py-3">
          <label className="block text-gray-700 text-sm">
            Resume (.docx, .doc, .pdf)
          </label>
          <div
            {...getResumeRootProps()}
            className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
          >
            <input {...getResumeInputProps()} />
            {resume ? (
              <p>{resume.name}</p>
            ) : (
              <p>Drag and drop a file, or click to select a document</p>
            )}
          </div>
          {errors.resume && (
            <p className="text-xs-sm text-red-500 first-letter:capitalize">
              {errors.resume.message}
            </p>
          )}
          {!deletedResume && user?.profile.resume && (
            <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50 mt-2 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span className="">
                  {getFilenameAndExtension(user?.profile.resume)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href={user.profile?.resume as string}
                  download
                  target="_blank"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {WithTooltip(
                        "Download",
                        <Image
                          src="/icons/download.svg"
                          width={20}
                          height={20}
                          alt="file icon"
                        />
                      )}
                    </div>
                  </div>
                </Link>
                {WithTooltip(
                  "Remove",
                  <span
                    onClick={() => {
                      setValue("resume", "");
                      setDeletedResume(true);
                    }}
                  >
                    <Image
                      src="/icons/bin.svg"
                      width={20}
                      height={20}
                      alt="file icon"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Would you like to be a mentor?
          </label>
          <div className="flex items-center space-x-4 mt-1 text-sm">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                checked={watch("is_mentor") === true}
                onChange={() => setValue("is_mentor", true)}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                checked={watch("is_mentor") === false}
                onChange={() => setValue("is_mentor", false)}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        {watch("is_mentor") && (
          <TextArea
            id="mentor_note"
            label="Leave a short note for potential mentees"
            value={watch("mentor_note") as string}
            onChange={(e) => setValue("mentor_note", e.target.value)}
            error={errors.mentor_note?.message as string}
            otherClasses={methods.register("mentor_note")}
          />
        )}
        <div className="flex items-center space-x-2 justify-end">
          <button
            onClick={() => handleModalClose()}
            type="button"
            className="px-6 py-2 text-sm bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            disabled={loading || fileUploadLoading}
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

export default UpdateProfileForm;
