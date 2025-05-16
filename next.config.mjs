// import injectWhyDidYouRender from "./src/scripts/why-did-you-render/index.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, context) => {
  //   injectWhyDidYouRender(config, context);
  //   return config;
  // },
  // reactStrictMode: false,
  // productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
