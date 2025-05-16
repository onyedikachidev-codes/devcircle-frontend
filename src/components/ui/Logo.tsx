import Link from "next/link";
import Image from "next/image";

export const LogoMin = () => {
  return (
    <Link href="/">
      <Image
        src="/icons/logo.svg"
        alt="home"
        className="w-5 h-5 hover:opacity-80 transition duration-300"
        width={0}
        height={0}
      />
    </Link>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/icons/logo.svg"
        alt="home"
        className="w-8 h-8 hover:opacity-80 transition duration-300"
        width={0}
        height={0}
      />
    </Link>
  );
};

export default Logo;
