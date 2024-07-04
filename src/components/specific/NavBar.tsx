"use client"
import { useTheme } from "@/context/ThemeContext"
import { signOut } from 'next-auth/react';
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutIcon } from "../icons/LogoutIcon";

export const NavBar = () => {
  const { mode, toggleMode } = useTheme();
  const pathname = usePathname();
  
  return (
    <header className='mb-2 w-full bg-white dark:bg-black shadow-md rounded-lg'>
      <nav className="w-full flex justify-center md:justify-end items-center px-10 py-4 gap-5 md:gap-10">
        <div className="flex items-center justify-center gap-5 md:gap-10">
          <Link href="/" className={`hover:underline ${pathname === '/' ? 'underline' : ''}`}>Home</Link>
          <Link href="/dashboard" className={` hover:underline ${pathname === '/dashboard' ? 'underline' : ''}`}>Dashboard</Link>
        </div>
        <div className="flex items-center justify-end gap-5 md:gap-10">
          <div onClick={toggleMode} className="text-sm font-medium text-center">
            {mode === "dark" ? <DarkModeIcon className="h-6 w-6" /> : <LightModeIcon className="h-6 w-6" />}
          </div>
          <div onClick={() => signOut()}><LogoutIcon className="h-6 w-6" /></div>
        </div>
      </nav>
    </header >
  )
}

