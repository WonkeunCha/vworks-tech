import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vworks.tech"),
  title: {
    default: "VWorks Technologies — Beyond Boundaries, Built to Scale",
    template: "%s | VWorks Technologies",
  },
  description: "HPC·AI·스토리지·보안 인프라 전문 기업. VAST Data, HPE Cray, Dell Technologies 공식 파트너.",
  keywords: ["HPC", "AI 인프라", "VAST Data", "Dell PowerEdge", "HPE Cray", "망연계", "부산 IT"],
  openGraph: {
    siteName: "VWorks Technologies",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
