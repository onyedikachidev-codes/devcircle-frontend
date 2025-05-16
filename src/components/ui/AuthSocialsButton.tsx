import React from "react";
import Image from "next/image";

interface IAuthSocialButtonProps {
  logoUrl: string;
  text: string;
  onClick: () => void;
}

const AuthSocialsButton: React.FC<IAuthSocialButtonProps> = ({
  logoUrl,
  text,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-50 hover:bg-slate-100 border cursor-pointer border-gray-100 rounded-xl flex justify-center items-center text-black py-3 space-x-2"
    >
      <div>
        <Image src={logoUrl} alt="logo" width={28} height={28} />
      </div>
      <div className="text-center mt-1">{text}</div>
    </div>
  );
};

export default AuthSocialsButton;
