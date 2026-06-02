import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "서울피닉스 FC | Seoul Phoenix FC",
    template: "%s | 서울피닉스 FC",
  },
  description:
    "서울피닉스 FC - 대한민국-말레이시아를 잇는 축구 클럽. Malaysia A1 Semi-Pro League에서 활약하는 서울피닉스의 공식 홈페이지입니다.",
  keywords: [
    "서울피닉스",
    "Seoul Phoenix",
    "FC 서울피닉스",
    "축구",
    "K리그",
    "말레이시아 축구",
    "Malaysia A1 Semi-Pro League",
  ],
  openGraph: {
    title: "서울피닉스 FC | Seoul Phoenix FC",
    description:
      "대한민국-말레이시아를 잇는 축구 클럽, 서울피닉스 FC",
    siteName: "서울피닉스 FC",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
