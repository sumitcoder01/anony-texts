"use client"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "../ui/button";
import { signOut } from 'next-auth/react';
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";
import Link from "next/link";

export const NavBar = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <header className='mb-2 w-full bg-[#FAF9F6] dark:bg-[#282C35]'>
      <nav className="w-full flex justify-center md:justify-end items-center py-4 px-6 gap-5">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="font-semibold hover:underline">Home</Link>
          <Link href="/dashboard" className="font-semibold hover:underline">Dashboard</Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button className="text-sm font-medium bg-red-600 hover:bg-red-800" variant="outline" onClick={() => signOut()}>Logout</Button>
          <div onClick={toggleMode} className="text-sm font-medium text-center">
            {mode === "dark" ? <DarkModeIcon className="h-4 w-4" /> : <LightModeIcon className="h-4 w-4" />}
          </div>
        </div>
      </nav>
    </header >
  )
}

