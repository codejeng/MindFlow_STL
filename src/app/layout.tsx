import { Fredoka, Mitr } from "next/font/google";
import AppProviders from "@/providers";
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
  title: "MindFlow – Board Game",
  description: "The Path To Understanding — เส้นทางแห่งความเข้าใจ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${fredoka.variable} ${mitr.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
