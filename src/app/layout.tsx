import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const roboto = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnLab",
  description: "Discover Courses",
  icons: {
    // icon: "/favicon1.png",
    // shortcut: "/favicon1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="">
      <body className={` ${roboto.className} antialiased`}>
        <Providers>
          <Toaster richColors position="top-center" />

          {children}
        </Providers>
      </body>
    </html>
  );
}
