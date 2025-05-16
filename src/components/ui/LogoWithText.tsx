import Link from "next/link";
import Image from "next/image";

const LogoWithText = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/icons/logo.svg"
        alt="home"
        className="w-6 h-6 sm:w-8 sm:h-8 hover:opacity-80 transition duration-300"
        width={0}
        height={0}
      />
      <span className="hidden sm:block text-blue-700 font-medium text-base sm:text-lg">
        TechGather
      </span>
    </Link>
  );
};

export default LogoWithText;
