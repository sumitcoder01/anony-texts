"use client"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "../ui/button";
import { signOut } from 'next-auth/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export const NavBar = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <header className='mb-2 w-full bg-orange-900 text-right'>
      <NavigationMenu className="w-full flex justify-center items-center py-4 px-6 gap-4 bg-red-700">
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="font-semibold">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold">Account</NavigationMenuTrigger>
          <NavigationMenuContent className="w-28">
            <NavigationMenuList className="flex flex-col items-center gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink onClick={() => signOut()}>Logout</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button onClick={toggleMode} className="text-sm font-medium">
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </NavigationMenuItem>
      </NavigationMenu>
    </header>
  )
}

