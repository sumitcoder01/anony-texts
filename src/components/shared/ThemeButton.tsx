"use client"
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";
import { useTheme } from "@/context/ThemeContext";

export const ThemeButton = () => {
    const { mode, toggleMode } = useTheme();
    return (
        <div onClick={toggleMode} className="text-center cursor-pointer">
            {mode === "dark" ? <DarkModeIcon className="h-6 w-6" /> : <LightModeIcon className="h-6 w-6" />}
        </div>
    )
}