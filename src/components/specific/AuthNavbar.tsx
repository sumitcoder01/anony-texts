"use client"
import { useTheme } from "@/context/ThemeContext"
import Link from "next/link"
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";


export const AuthNavbar = () => {
    const { mode, toggleMode } = useTheme();

    return (
        <header className="sticky mb-2 w-full h-24 bg-white dark:bg-black shadow-md rounded-lg z-50 top-0">
            <nav className="w-full h-full flex justify-center md:justify-between items-center px-10 gap-5 md:gap-10">
            <Link href="/" className="text-md sm:text-xl md:text-2xl text-start font-bold">Anony Texts</Link>
                <div className="flex justify-center md:justify-between items-center gap-5 md:gap-10 px-2">
                    <Link className="hover:font-semibold" href="/">Home</Link>
                    <div onClick={toggleMode} className="text-sm font-medium text-center">
                        {mode === "dark" ? <DarkModeIcon className="h-6 w-6" /> : <LightModeIcon className="h-6 w-6" />}
                    </div>
                </div>
            </nav>
        </header >
    )
}
