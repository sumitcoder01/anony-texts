import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/context/ThemeContext";
import { BodyWrapper } from "@/components/specific/BodyWrapper";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Anony Texts",
  description: "You can text anonymously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <ThemeProvider>
        <AuthProvider>
          <BodyWrapper>
            {children}
            <Toaster />
          </BodyWrapper>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}