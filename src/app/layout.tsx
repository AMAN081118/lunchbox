// src/app/layout.tsx
import { ModalProvider } from "@/context/ModalContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(components)/layout/Header";
import GlobalModalRenderer from "./(components)/GlobalModalRenderer";
import UserInitializer from "./(components)/UserInitializer"; // client component

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <Header />
          <UserInitializer /> {/* Loads profile into Zustand */}
          <main>{children}</main>
          <GlobalModalRenderer />
        </ModalProvider>
      </body>
    </html>
  );
}
