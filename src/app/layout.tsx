// src/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | YourName — Software Engineer",
    default: "YourName — Software Engineering Portfolio",
  },
  description:
    "Software Engineer specializing in scalable cloud architectures, backend systems, and enterprise solutions. Master's in Software Engineering.",
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Cloud Architecture",
    "Spring Boot",
    "Next.js",
    "Morocco",
    "Portfolio",
  ],
  authors: [{ name: "YourName" }],
  creator: "YourName",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourname.dev",
    siteName: "YourName Portfolio",
    title: "YourName — Software Engineering Portfolio",
    description:
      "Building enterprise-grade software solutions. Specializing in cloud, backend, and system architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourName — Software Engineering Portfolio",
    description: "Building enterprise-grade software solutions.",
    creator: "@yourhandle",
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
