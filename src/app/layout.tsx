import type { Metadata } from "next";
import { cookies } from "next/headers";
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
  metadataBase: new URL("https://ronanprugh.com"),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the persisted theme from a cookie during SSR so the correct class is
  // present in the initial HTML — no client-side flash, no inline script.
  const theme = (await cookies()).get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} scroll-smooth ${theme}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
