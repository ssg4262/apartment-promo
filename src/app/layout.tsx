import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "르클래스 센트럴파크 | 강남 프리미엄 아파트 분양",
  description:
    "삼성역 도보 5분, 강남 핵심 입지의 프리미엄 아파트 르클래스 센트럴파크. 59~107㎡, 1,200세대 대단지. 관심고객 등록 접수 중.",
  keywords: ["르클래스", "센트럴파크", "강남 아파트", "삼성역", "분양", "아파트 분양"],
  openGraph: {
    title: "르클래스 센트럴파크 | 강남 프리미엄 아파트 분양",
    description: "삼성역 도보 5분, 강남 핵심 입지의 프리미엄 아파트",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
