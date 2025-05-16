import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

import { Feedback, Project } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { serializeData } from "@/lib/helpers";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { CustomError } from "@/lib/helpers/class";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import TextArea from "./TextArea";

import "../../app/globals.css";

const schema = yup.object().shape({
  text: yup
    .string()
    .required("Feedback is required")
    .min(25, "Feedback must be at least 25 characters"),
});

interface IFeedbackFormProps {
  projectData?: Partial<Project>;
  feedbackData?: Partial<Feedback>;
  triggerRefetch?: () => void;
  handleModalClose?: () => void;
}

const createFeedback = async (data: Partial<Feedback>, projectId: string) => {
  const response = await axiosInstance.post(
    `/api/proxy/projects/${projectId}/feedbacks`,
    data
  );

  return response.data.data;
};

const updateFeedback = async (
  data: Partial<Feedback>,
  feedbackId: string,
  projectId: string
) => {
  const response = await axiosInstance.put(
    `/api/proxy/projects/${projectId}/${feedbackId}/feedbacks`,
    data
  );

  return response.data.data;
};

const FeedbackForm: React.FC<IFeedbackFormProps> = ({
  projectData,
  feedbackData,
  handleModalClose,
  triggerRefetch,
}) => {
  const defaultValues = {
    text: feedbackData?.text || "",
  };
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const feedbackMutation = useMutation({
    mutationFn: (data: Partial<Feedback>) =>
      feedbackData?.id
        ? updateFeedback(
            data,
            feedbackData?.id as string,
            projectData?.id as string
          )
        : createFeedback(data, projectData?.id as string),
    onSuccess: () => {
      const feedbackMessage = feedbackData?.id
        ? feedbackTextMapper.update("Feedback")
        : feedbackTextMapper.create("Feedback");

      successToast(feedbackMessage);
      handleModalClose && handleModalClose();
      triggerRefetch && triggerRefetch();
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    const formattedData = serializeData(data);

    (async function () {
      await feedbackMutation.mutate({
        guide: feedbackData?.guide || projectData?.feedback_guide,
        ...formattedData,
      });
    })();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 px-4 py-2 max-w-4xl mx-auto"
      >
        {projectData?.feedback_guide && (
          <p className="text-gray-700 text-sm">{projectData?.feedback_guide}</p>
        )}
        <TextArea
          id="text"
          label={`Feedback (${watch("text").length}/50)`}
          value={watch("text") as string}
          onChange={(e: any) => setValue("text", e.target.value)}
          error={errors.text?.message as string}
          otherClasses={methods.register("text")}
          required
        />
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
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FeedbackForm;
