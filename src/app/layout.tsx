import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "VWorks Technologies — AI·HPC 인프라 전문 | VAST Data 공식 파트너",
    template: "%s | VWorks Technologies",
  },
  description: "VAST Data 공식 파트너 브이웍스테크놀로지스. 국방·공공·연구기관 특화 HPC 클러스터, AI 컴퓨팅 서버, 올플래시 스토리지 구축 전문. 부산 기반 전국 서비스.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
