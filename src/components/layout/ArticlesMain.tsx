"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "../../lib/react-query-client";

export default function ArticlesLayoutMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen bg-white text-custom-gray">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
}
