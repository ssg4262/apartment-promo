import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "호반써밋 경산 상방공원 1단지 | 분양 안내",
  description:
    "경산 상방공원 조망, 980세대 프리미엄 대단지 호반써밋. 59~107㎡, 호반건설 시공. 관심고객 등록 접수 중.",
  keywords: ["호반써밋", "경산", "상방공원", "분양", "아파트 분양", "호반건설"],
  openGraph: {
    title: "호반써밋 경산 상방공원 1단지 | 분양 안내",
    description: "경산 상방공원 조망, 980세대 프리미엄 대단지 호반써밋",
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
