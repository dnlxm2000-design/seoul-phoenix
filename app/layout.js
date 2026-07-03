import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "서울피닉스FC",
    template: "%s | 서울피닉스FC",
  },
  description:
    "서울피닉스FC - 대한민국-말레이시아를 잇는 축구 클럽.",
  keywords: [
    "서울피닉스",
    "Seoul Phoenix",
    "FC 서울피닉스",
    "축구",
    "K리그",
    "말레이시아 축구",
  ],
  openGraph: {
    title: "서울피닉스FC",
    description:
      "대한민국-말레이시아를 잇는 축구 클럽, 서울피닉스FC",
    siteName: "서울피닉스FC",
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
