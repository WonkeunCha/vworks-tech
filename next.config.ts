import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_NOTION_TOKEN: process.env.NOTION_TOKEN,
    NEXT_PUBLIC_NOTION_NOTICE_DB_ID: process.env.NOTION_NOTICE_DB_ID,
    NEXT_PUBLIC_NOTION_FAQ_DB_ID: process.env.NOTION_FAQ_DB_ID,
    NEXT_PUBLIC_NOTION_NEWS_DB_ID: process.env.NOTION_NEWS_DB_ID,
  },
};

export default nextConfig;
