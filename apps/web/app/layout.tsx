import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "components/navbar";
import MaxWidthWrapper from "components/MaxWidthWrapper";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Article test",
  description: "a test web application for nevisa",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {






  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} text-right bg-gray-50 text-gray-800 relative h-full antialiased`}>
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <MaxWidthWrapper>
            <div className="flex-1 flex-grow">{children}</div>
          </MaxWidthWrapper>
        </main>
      </body>
    </html>
  );
}
