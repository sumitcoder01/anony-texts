"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeStateProps = {
    children: ReactNode
}

export type ThemeContextTypes = {
    mode: string,
    toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextTypes>({
    mode: "dark",
    toggleMode: () => {}
});

export default function ThemeState({ children }: ThemeStateProps) {
    const [mode, setMode] = useState<string>("dark");

    const toggleMode = () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
