import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthContext from "@/context/auth.context.wrapper";
import AntdRegistry from "./../../node_modules/@ant-design/nextjs-registry/es/AntdRegistry";
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Yogus",
  description: "Connecting people everywhere in the world.",
  icons: {
    icon: "/icons/logoWeb.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-dark-2`}>
        <NextAuthContext>
          <AntdRegistry>
           
            {children}
            <Toaster/>
           </AntdRegistry>
        </NextAuthContext>
      </body>
    </html>
  );
}
