import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ronan Prugh — Software Engineer",
  description:
    "Software engineer building cloud billing systems, AI-powered developer tools, and full-stack products. Michigan CS '23.",
  openGraph: {
    title: "Ronan Prugh — Software Engineer",
    description:
      "Software engineer building cloud billing systems, AI-powered developer tools, and full-stack products. Michigan CS '23.",
    url: "https://ronanprugh.com",
    siteName: "Ronan Prugh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ronan Prugh — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronan Prugh — Software Engineer",
    description:
      "Software engineer building cloud billing systems, AI-powered developer tools, and full-stack products. Michigan CS '23.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash theme script: reads localStorage before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=t||(d?'dark':'light');document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(theme);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
