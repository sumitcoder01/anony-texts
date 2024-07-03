"use client"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "../ui/button";
import { signOut } from 'next-auth/react';
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const { mode, toggleMode } = useTheme();
  const pathname = usePathname();
  return (
    <header className='mb-2 w-full bg-white dark:bg-black'>
      <nav className="w-full flex justify-center md:justify-end items-center py-4 px-6 gap-5 md:gap-12">
        <div className="flex items-center justify-center gap-4 md:gap-10">
          <Link href="/" className={`font-semibold hover:underline ${pathname === '/' ? 'underline' : ''}`}>Home</Link>
          <Link href="/dashboard" className={`font-semibold hover:underline ${pathname === '/dashboard' ? 'underline' : ''}`}>Dashboard</Link>
        </div>
        <div className="flex items-center justify-end gap-4 md:gap-6">
          <Button className="text-sm font-medium bg-red-600 hover:bg-red-800" variant="outline" onClick={() => signOut()}>Logout</Button>
          <div onClick={toggleMode} className="text-sm font-medium text-center">
            {mode === "dark" ? <DarkModeIcon className="h-6 w-6" /> : <LightModeIcon className="h-6 w-6" />}
          </div>
        </div>
      </nav>
    </header >
  )
}

