import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "./StoreProvider";

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
  title: "Chat with PDF",
  description:
    "Transform your PDFs into interactive learning experiences. Our AI-powered platform allows you to effortlessly ask questions about your documents and receive instant, insightful answers. Need to test your understanding? Easily generate engaging quizzes directly from your PDFs, complete with multiple-choice, true/false, and short-answer questions.",
    verification: {
      google: "g3-BCfDeRPf6XBNGCbsB3wcxkkaC4DMGoRzZYSmlhEo"
    }
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StoreProvider>
            <div className="w-full h-full flex">{children}</div>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
