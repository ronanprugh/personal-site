import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ronan Prugh — Software Engineer",
  description:
    "Software engineer with a passion for building great products. View my experience, projects, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} dark`} suppressHydrationWarning>
      <head>
        {/* No-flash theme script: reads localStorage before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=t||(d?'dark':'light');document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(theme);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <ThemeProvider>
          <header className="flex items-center justify-end px-6 py-4">
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
