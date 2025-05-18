import Link from "next/link";
import Image from "next/image";
import icon from "../../../public/icon.png"

export const LogoMin = () => {
  return (
    <Link href="/">
      <Image
        src={icon}
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
        src={icon}
        alt="home"
        className="w-8 h-8 hover:opacity-80 transition duration-300"
        width={0}
        height={0}
      />
    </Link>
  );
};

export default Logo;
