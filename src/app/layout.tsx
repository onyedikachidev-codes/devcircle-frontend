import React from "react";
import type { Metadata } from "next";
// import wdyr from "@welldone-software/why-did-you-render";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "TechGather | Elevate Your Developer Journey",
  description:
    "TechGather helps developers elevate their careers by connecting them with valuable articles, impactful events, and a network of like-minded professionals. Discover the tools and opportunities you need to succeed.",
  keywords: [
    "developer growth",
    "tech events",
    "career resources",
    "developer articles",
    "networking for developers",
    "developer community",
    "upskill for developers",
    "tech knowledge sharing",
    "developer events",
    "career advancement",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="51d95690-d038-4d22-8fcc-3be6e9e3faba"
          strategy="lazyOnload"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
