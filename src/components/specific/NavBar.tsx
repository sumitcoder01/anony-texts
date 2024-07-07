"use client"
import { useTheme } from "@/context/ThemeContext"
import { signOut, useSession } from 'next-auth/react';
import { DarkModeIcon } from "../icons/DarkModeIcon";
import { LightModeIcon } from "../icons/LightModeIcon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoutIcon } from "../icons/LogoutIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSub,
} from "@/components/ui/dropdown-menu"
import { avatarDefaultImg } from "@/constants/avatarDefault";
import { User } from "next-auth";
import { Button } from "../ui/button";


export const NavBar = () => {
  const { data: session } = useSession();
  const { mode, toggleMode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const user: User | null = session?.user;

  return (
    <header className="sticky mb-2 w-full bg-white dark:bg-black shadow-md rounded-lg z-50 top-0">
      <nav className="w-full flex justify-center md:justify-end items-center px-10 py-4 gap-5 md:gap-10">
        <div className="flex items-center justify-center gap-5 md:gap-10">
          <Link href="/" className={`hover:font-semibold ${pathname === '/' ? 'font-semibold' : ''}`}>Home</Link>
          {user && <Link href="/dashboard" className={` hover:font-semibold ${pathname === '/dashboard' ? 'font-semibold' : ''}`}>Dashboard</Link>}
        </div>
        <div className="flex items-center justify-end gap-5 md:gap-10">
          <div onClick={toggleMode} className="text-sm font-medium text-center">
            {mode === "dark" ? <DarkModeIcon className="h-6 w-6" /> : <LightModeIcon className="h-6 w-6" />}
          </div>
          {user ? <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={avatarDefaultImg} />
                <AvatarFallback>Account</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.replace("/u/profile")}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.replace("/dashboard")}>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Contact us</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => router.replace("https://mail.google.com/mail/?view=cm&fs=1&to=sumitjha1344@gmail.com")}>Email</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.replace("/u/adminuser123")}>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={() => router.replace("/dashboard")}>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.replace("https://github.com/sumitcoder01/anony-texts")}>GitHub</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.replace("/u/adminuser123")}>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Log out <LogoutIcon className="h-6 w-6 ml-4" />
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            :
            <Button onClick={() => router.replace("/login")} variant={"destructive"}>Login</Button>
          }
        </div>
      </nav>
    </header >
  )
}

