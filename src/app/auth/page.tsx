"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageLoadingComponent from "@/components/ui/PageLoading";

interface AuthPageProps {
  searchParams: Record<string, string>;
  params: { slug?: string[] };
}

const AuthPage: React.FC<AuthPageProps> = ({ searchParams }) => {
  const router = useRouter();
  const actionParam = searchParams?.guestAuthSignin;

  useEffect(() => {
    (async function () {
      try {
        localStorage.clear();

        const res = await signIn("credentials", {
          redirect: false,
          token: actionParam,
          callbackUrl: "/dashboard",
        });

        if (res?.error) {
          router.push("/");
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        router.push("/");
      }
    })();
  }, []);

  return <PageLoadingComponent />;
};

export default AuthPage;
