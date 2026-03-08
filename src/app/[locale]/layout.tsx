import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return {
    title: {
      default: isKo
        ? "VWorks Technologies — AI·HPC 인프라 전문 | VAST Data 공식 파트너"
        : "VWorks Technologies — AI·HPC Infrastructure | VAST Data Official Partner",
      template: "%s | VWorks Technologies",
    },
    description: isKo
      ? "VAST Data 공식 파트너 브이웍스테크놀로지스. 국방·공공·연구기관 특화 HPC 클러스터, AI 컴퓨팅 서버, 올플래시 스토리지 구축 전문. 부산 기반 전국 서비스."
      : "VWorks Technologies — Official VAST Data Partner. Specialized HPC clusters, AI computing, and all-flash storage for defense, public, and research institutions. Based in Busan, Korea.",
    keywords: isKo
      ? ["VAST Data 파트너", "HPC 클러스터 구축", "AI 서버 구축", "GPU 서버", "망분리 솔루션", "부산 IT 인프라", "국방 HPC"]
      : ["VAST Data partner", "HPC cluster", "AI server", "GPU server", "network separation", "Busan IT infrastructure", "defense HPC"],
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      url: `https://vworks.tech/${locale}`,
      siteName: "VWorks Technologies",
      title: "VWorks Technologies — VAST Data Official Partner",
      description: isKo
        ? "국방·공공·연구기관 특화 HPC·AI·스토리지 인프라 전문 기업"
        : "Specialized HPC·AI·Storage infrastructure for defense, public, and research institutions",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "VWorks Technologies",
      description: isKo ? "VAST Data 공식 파트너 | HPC·AI 인프라 전문" : "VAST Data Official Partner | HPC·AI Infrastructure",
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    alternates: {
      canonical: `https://vworks.tech/${locale}`,
      languages: {
        "ko-KR": "https://vworks.tech/ko",
        "en-US": "https://vworks.tech/en",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ko" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main style={{ position: "relative", zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
