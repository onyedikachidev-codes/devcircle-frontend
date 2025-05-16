import { ReactNode } from "react";

export default function DashboadHeader({ children }: { children: ReactNode }) {
  return (
    <header className="w-full font-light text-gray-600 border-b border-gray-200">
      {children}
    </header>
  );
}
