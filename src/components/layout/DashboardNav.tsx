import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, shallowEqual } from "react-redux";
import { usePathname } from "next/navigation";

import NotificationIcon from "@/components/ui/NotificationIcon";
import ProfileIcon from "@/components/ui/ProfileIcon";
import { RootState } from "@/store";
import MessagesIcon from "../ui/MessagesIcon";
import { LogoMin } from "../ui/Logo";
import LogoWithText from "../ui/LogoWithText";
import { WithTooltip } from "../ui/WithTooltip";
import { selectCurrentUser } from "@/lib/selectors";

const DashboardNav: React.FC = React.memo(() => {
  const pathname = usePathname();
  const user = useSelector(
    (state: RootState) => selectCurrentUser(state),
    shallowEqual
  );

  const links = useMemo(
    () => [
      { name: "Home", href: "/dashboard" },
      { name: "Events", href: "/dashboard/events" },
      { name: "Articles", href: "/dashboard/articles" },
      { name: "Jobs", href: "/dashboard/jobs" },
    ],
    []
  );

  return (
    <nav className="flex flex-wrap justify-end xxs:flex-nowrap xs:justify-between items-center lg:space-x-0 px-2 py-2 xs:py-0 xs:px-6 xs:h-14 bg-white">
      <ul>
        <li className="hover:scale-110 transform transition duration-300">
          <span className="hidden md:block">
            <LogoWithText />
          </span>
          <span className="block md:hidden">
            <LogoMin />
          </span>
        </li>
      </ul>
      <ul className="flex flex-wrap xxs:flex-nowrap justify-between items-center text-sm text-gray-700">
        {links.map((link) => (
          <li key={link.href} className="relative group cursor-pointer">
            <Link
              href={link.href}
              className={`hidden md:block px-3 md:px-5 lg:px-8 py-2 border-b ${
                pathname === link.href
                  ? "border-violet-700 text-violet-700 font-semibold"
                  : "border-transparent group-hover:border-b-violet-700 group-hover:text-violet-700 group-hover:font-normal"
              } transition-all duration-300 ease-in-out delay-150`}
            >
              {link.name}
            </Link>
            <Link
              href={link.href}
              className={`block md:hidden px-3 sm:px-5 lg:px-8 py-2 border-b ${
                pathname === link.href
                  ? "border-violet-700 text-violet-700 font-semibold"
                  : "border-transparent group-hover:border-b-violet-700 group-hover:text-violet-700 group-hover:font-normal"
              } transition-all duration-300 ease-in-out delay-150`}
            >
              {WithTooltip(
                link.name,
                <Image
                  src={`/icons/${link.name.toLowerCase()}.svg`}
                  alt=""
                  className="w-5 h-5"
                  width={0}
                  height={0}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex justify-between space-x-3 lg:space-x-6 items-center">
        <li>
          <NotificationIcon />
        </li>
        <li>
          <ProfileIcon avatar={user?.profile?.avatar} />
        </li>
      </ul>
    </nav>
  );
});

DashboardNav.displayName = "DashboardNav";

export default DashboardNav;
