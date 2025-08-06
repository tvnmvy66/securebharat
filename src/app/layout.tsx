import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "SecureBharat",
  description: "A platform that care about security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <html lang="en">
      <body className="bg-black">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
          <Toaster />
          <Navbar/>
           {children}
          <Footer/>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
