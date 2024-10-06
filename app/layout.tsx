import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import "./globals.css";
import Script from "next/script";

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
  title:
    "Best JSON Formatter and JSON Validator: Online JSON Formatter, JSON to XML, JSON beautifier",
  description:
    "Online JSON Formatter / Beautifier and JSON Validator will format JSON data, and helps to validate, convert JSON to XML, JSON to CSV. Save and Share JSON",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XY4H2C61EY`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XY4H2C61EY');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
