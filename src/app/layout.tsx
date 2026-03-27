// src/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name} — Software Engineer`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Cloud Architecture",
    "Spring Boot",
    "Next.js",
    "Morocco",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.socials.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
