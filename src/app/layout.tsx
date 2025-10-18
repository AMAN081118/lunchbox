// src/app/layout.tsx (Updated)

import { ModalProvider } from "@/context/ModalContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(components)/layout/Header";

// Import the new wrapper component
import GlobalModalRenderer from "./(components)/GlobalModalRenderer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LunchBox",
  description: "Don't wait in Line",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <Header />
          <main>{children}</main>

          {/* Renders the wrapper component which passes the necessary context props */}
          <GlobalModalRenderer />
        </ModalProvider>
      </body>
    </html>
  );
}
