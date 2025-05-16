"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn, signOut } from "next-auth/react";

import AuthButton from "@/components/ui/Button";
import Input from "@/components/forms/Input";
import { useRouter } from "next/navigation";
import { errorToast, errorToastWithCustomError } from "@/lib/helpers/toast";
import { CustomError } from "@/lib/helpers/class";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    const res = await signIn(provider, { callbackUrl: "/" });
    if (res?.error) {
      setError("Failed to sign in with " + provider);
    } else {
      router.push("/dashboard");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    localStorage.clear();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        if (res?.status === 401) {
          errorToast(
            "Invalid login credentials. Please check your username and password and try again."
          );
        }

        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      errorToastWithCustomError(error as CustomError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-4 px-1 xs:px-2">
      <div className="space-y-2 text-center mx-auto">
        <div className="text-xl md:text-2xl font-bold text-gray-700">
          Welcome back to <span className="text-blue-700">TechGather!</span>
        </div>
        <p className="text-gray-400 font-light text-sm md:text-base">
          Log in to network with developers, collaborate on exciting projects,
          and unlock career-advancing opportunities.
        </p>
      </div>
      {/* <div className="p-4 mt-3 space-y-4"> */}
      {/* <AuthSocialsButton
          text="Continue with Linkedin"
          logoUrl="/icons/linkedin.svg"
          onClick={() => handleSignIn("linkedin")}
        /> */}
      {/* <AuthSocialsButton
          text="Continue with Google"
          logoUrl="/icons/google.svg"
          onClick={() => handleSignIn("google")}
        /> */}
      {/* </div> */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {/* <div className="flex flex-row items-center justify-center space-x-3">
        <span className="border-b border-b-3 border-gray-300 w-1/3"></span>
        <span className="-mt-1">or</span>
        <span className="border-b border-b-3 border-gray-300 w-1/3"></span>
      </div> */}
      <div className="p-1 xs:p-2 lg:p-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 md:space-y-4">
            <div>
              <Input
                id="email"
                label="Email"
                value={watch("email")}
                onChange={(e) => setValue("email", e.target.value)}
                error={errors.email?.message as string}
                otherClasses={methods.register("email")}
              />
            </div>
            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                value={watch("password")}
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password?.message as string}
                otherClasses={methods.register("password")}
              />
            </div>
          </div>
          <div className="mt-3 xs:mt-5 md:mt-10">
            <AuthButton
              text="Log In"
              style="bg-blue-600 text-white w-full hover:bg-blue-700"
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
