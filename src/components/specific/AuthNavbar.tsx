"use client"
import { useTheme } from "@/context/ThemeContext"
import Link from "next/link"
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";


export const AuthNavbar = () => {
    const { mode, toggleMode } = useTheme();

    return (
        <header className="sticky mb-2 w-full bg-white dark:bg-black shadow-md rounded-lg z-50 top-0">
            <nav className="w-full flex justify-center md:justify-end items-center px-10 py-4 gap-5 md:gap-10">
                <Link className="hover:font-semibold" href="/">Home</Link>
                <div onClick={toggleMode} className="text-sm font-medium text-center">
                    {mode === "dark" ? <DarkModeIcon className="h-6 w-6" /> : <LightModeIcon className="h-6 w-6" />}
                </div>
            </nav>
        </header>
    )
}
