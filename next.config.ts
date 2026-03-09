import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vworks-tech",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;