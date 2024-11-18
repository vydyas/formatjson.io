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
        <meta
          name="title"
          content="Best JSON Formatter and JSON Validator: Online JSON Formatter, JSON to XML, JSON beautifier"
        />
        <meta
          name="description"
          content="Online JSON Formatter / Beautifier and JSON Validator will format JSON data, and helps to validate, convert JSON to XML, JSON to CSV. Save and Share JSON"
        />
        <meta
          name="keywords"
          content="JSON Formatter, JSON Validator, JSON beautifier, JSON to XML, JSON to CSV, Format JSON online"
        />
        <meta name="author" content="Siddhu Vydyabhushana" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Best JSON Formatter and JSON Validator: Online JSON Formatter, JSON to XML, JSON beautifier"
        />
        <meta
          property="og:description"
          content="Online JSON Formatter / Beautifier and JSON Validator will format JSON data, and helps to validate, convert JSON to XML, JSON to CSV. Save and Share JSON"
        />
        <meta property="og:image" content="/landing_page.png" />
        <meta property="og:url" content="https://formatjson.io/" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Best JSON Formatter and JSON Validator: Online JSON Formatter, JSON to XML, JSON beautifier"
        />
        <meta
          property="twitter:description"
          content="Online JSON Formatter / Beautifier and JSON Validator will format JSON data, and helps to validate, convert JSON to XML, JSON to CSV. Save and Share JSON"
        />
        <meta property="twitter:image" content="/landing_page.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://formatjson.io/" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XY4H2C61EY"
        ></script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XY4H2C61EY');
          `}
        </Script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Best JSON Formatter and JSON Validator: Online JSON Formatter, JSON to XML, JSON beautifier",
            url: "https://formatjson.io",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://formatjson.io?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        {children}
      </body>
    </html>
  );
}
