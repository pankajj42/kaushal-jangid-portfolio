import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Kaushal Jangid | Wedding invitation videos and motion design", template: "%s | Kaushal Jangid" },
  description:
    "Indian wedding invitation videos, After Effects templates, festival greetings and brand visuals by Kaushal Jangid, a designer based in Mumbai.",
  openGraph: { title: "Kaushal Jangid", description: "Invitations that move.", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

// Runs before paint so the saved or system theme shows with no flash.
const themeInit = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <Header />
        {children}
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
