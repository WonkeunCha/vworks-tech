/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vworks.tech",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://vworks.tech/ko", hreflang: "ko" },
    { href: "https://vworks.tech/en", hreflang: "en" },
  ],
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/"] },
    ],
    additionalSitemaps: ["https://vworks.tech/sitemap.xml"],
  },
};
