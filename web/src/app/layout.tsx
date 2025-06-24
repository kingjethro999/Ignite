import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ignite - React Native DSL Framework",
  description: "A domain-specific language (DSL) and compiler framework designed to simplify React Native development by providing a more declarative, XML-like syntax for building mobile applications.",
  keywords: "React Native, DSL, Framework, Mobile Development, TypeScript, JavaScript",
  authors: [{ name: "Ignite Team" }],
  openGraph: {
    title: "Ignite - React Native DSL Framework",
    description: "Simplify React Native development with declarative XML-like syntax",
    type: "website",
    url: "https://ignite-framework.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
