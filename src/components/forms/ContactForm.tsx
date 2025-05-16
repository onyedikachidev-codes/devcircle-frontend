"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthButton from "@/components/ui/Button";
import Input from "@/components/forms/Input";
import TextArea from "./TextArea";
import axios from "axios";
import { successToast } from "@/lib/helpers/toast";
import { Toaster } from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup
    .string()
    .min(6, "Message must be at least 20 characters")
    .required("Message is required"),
});

type FormValues = {
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    await axios
      .post(
        "https://getform.io/f/bjjjjllb",
        {
          message: data.message,
          email: data.email,
        },
        { headers: { Accept: "application/json" } }
      )
      .then(() => successToast("We have received your message!"))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Input
              id="email"
              label="Email"
              value={watch("email")}
              onChange={(e) => setValue("email", e.target.value)}
              error={errors.email?.message as string}
              otherClasses={methods.register("email")}
              required
            />
          </div>
          <div>
            <TextArea
              id="message"
              label="Message"
              value={watch("message") as string}
              onChange={(e: any) => setValue("message", e.target.value)}
              error={errors.message?.message as string}
              otherClasses={methods.register("message")}
              required
            />
          </div>
        </div>
        <div className="mt-10">
          <AuthButton
            text="Send message"
            style="bg-blue-600 text-white w-full hover:bg-blue-700"
            type="submit"
            loading={loading}
          />
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default ContactForm;
