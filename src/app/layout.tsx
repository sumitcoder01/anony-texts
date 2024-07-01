import type { Metadata } from "next";
import "./globals.css";

import ThemeState from "@/context/ThemeContext";
import { BodyWrapper } from "@/components/specific/BodyWrapper";

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
      <ThemeState>
        <BodyWrapper>{children}</BodyWrapper>
      </ThemeState>
    </html>
  );
}