"use client";

import { useState } from "react";
import AppModal from "./Modal";

import LoginPage from "../forms/LoginForm";
import RegisterPage from "../forms/RegisterForm";

const AuthButton = ({
  text,
  variant,
  className = "",
  onClick,
}: {
  text: string;
  variant?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} text-sm px-2 lg:px-4 py-2 lg:py-3 text-md sm:text-base rounded ${
        variant !== "filled"
          ? "text-gray-700 hover:bg-slate-50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
};

const HomeAuthControls = ({
  main,
  action,
}: {
  main?: boolean;
  action?: string;
}) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(
    action === "login" || false
  );
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  return (
    <div>
      {main && (
        <div className="space-x-1 sm:space-x-3 lg:space-x-5">
          <AuthButton
            text="Login"
            onClick={() => setLoginModalIsOpen((o) => !o)}
          />
          <AuthButton
            text="Register"
            variant="filled"
            onClick={() => setRegisterModalIsOpen((o) => !o)}
          />
        </div>
      )}
      {!main && (
        <AuthButton
          text="Everything you need to level up"
          variant="filled"
          onClick={() => setRegisterModalIsOpen((o) => !o)}
        />
      )}
      <AppModal
        isOpen={loginModalIsOpen}
        onClose={() => {
          setLoginModalIsOpen(false);
        }}
        width="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] xxl:w-[25%]"
      >
        <div>
          <LoginPage />
          <div className="flex justify-center space-x-1 pb-5 font-light text-sm md:text-base">
            <span className="inline-block">Don&apos;t have an account?</span>
            <span className="inline-block text-blue-600 cursor-pointer font-normal">
              <span
                onClick={() => {
                  setRegisterModalIsOpen((o) => !o);
                  setLoginModalIsOpen((o) => !o);
                }}
              >
                Create account
              </span>
            </span>
          </div>
        </div>
      </AppModal>
      <AppModal
        isOpen={registerModalIsOpen}
        onClose={() => {
          setRegisterModalIsOpen(false);
        }}
        width="w-full sm:w-[70%] md:w-[50%] lg:w-[45%] xl:w-[40%] xxl:w-[25%]"
      >
        <div>
          <RegisterPage />
          <div className="flex justify-center space-x-1 pb-5 font-light text-sm md:text-base">
            <span className="inline-block">Already have an account?</span>
            <span className="inline-block text-blue-600 cursor-pointer font-normal">
              <span
                onClick={() => {
                  setLoginModalIsOpen((o) => !o);
                  setRegisterModalIsOpen((o) => !o);
                }}
              >
                Login
              </span>
            </span>
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default HomeAuthControls;
