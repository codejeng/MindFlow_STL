import { Fredoka, Mitr } from "next/font/google";
import AppProviders from "@/providers";
import BottomNav from "@/components/layout/BottomNav";
import "./globals.css";
import type { Metadata } from "next";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mitr = Mitr({
  variable: "--font-mitr",
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindFlow – เข้าใจตนเอง เชื่อมโยงผู้อื่น",
  description: "แพลตฟอร์มสุขภาพจิตครอบครัว — เล่นเกม และปรึกษาผู้เชี่ยวชาญ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${fredoka.variable} ${mitr.variable}`} style={{ paddingBottom: 64 }}>
        <AppProviders>{children}</AppProviders>
        <BottomNav />
      </body>
    </html>
  );
}
