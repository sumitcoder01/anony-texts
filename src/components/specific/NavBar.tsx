"use client"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "../ui/button";
import Link from 'next/link';


export const NavBar = () => {
  const { mode, toggleMode } = useTheme();
  return (
    <div className="flex items-center justify-center gap-2">
      <Link href="/register" >Register</Link>
      <Link href="/login" >Login</Link>
      <Button onClick={toggleMode}>{mode === "dark" ? "light" : "dark"}</Button>
    </div>
  )
}
