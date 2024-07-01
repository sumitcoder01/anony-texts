"use client"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "../ui/button";


export const NavBar = () => {
  const { mode, toggleMode } = useTheme();
  return (
    <div>
      <Button onClick={toggleMode}>{mode === "dark" ? "light" : "dark"}</Button>
    </div>
  )
}
