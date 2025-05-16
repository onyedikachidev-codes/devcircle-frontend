import React from "react";

interface IAuthSocialButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  style: string;
  onclick?: () => void;
  loading?: boolean;
}

const AuthButton: React.FC<IAuthSocialButtonProps> = ({
  type = "submit",
  text,
  style,
  onclick,
  loading,
}) => {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onclick}
      className={`text-sm md:text-base rounded-lg md:rounded-xl flex justify-center items-center py-2.5 md:py-4 ${style}`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default AuthButton;
