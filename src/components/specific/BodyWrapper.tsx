"use client";

import React from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();

  return (
    <body
      className={cn(
        `min-h-screen bg-background font-sans antialiased ${mode}`,
        fontSans.variable
      )}
    >
      {children}
    </body>
  );
}