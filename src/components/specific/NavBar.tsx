"use client"
import { signOut, useSession } from 'next-auth/react';
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
import { ThemeButton } from "../shared/ThemeButton";


export const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const user: User | null = session?.user;

  return (
    <header className="sticky mb-2 w-full h-24 bg-secondary dark:bg-black shadow-md rounded-lg z-50 top-0">
      <nav className="w-full h-full flex justify-center md:justify-between items-center px-10 gap-5 md:gap-10">
        <Link href="/" className=" text-md sm:text-xl md:text-2xl text-start font-bold">Anony Texts</Link>
        <div className="flex items-center md:justify-end justify-center gap-5 md:gap-10 px-2">
          <div className="flex items-center justify-center gap-5 md:gap-10">
            <Link href="/" className={`hover:font-semibold ${pathname === '/' ? 'font-semibold' : ''}`}>Home</Link>
            {user && <Link href="/dashboard" className={` hover:font-semibold ${pathname === '/dashboard' ? 'font-semibold' : ''}`}>Dashboard</Link>}
          </div>
          <div className="flex items-center justify-end gap-5 md:gap-10">
            <ThemeButton />
            {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatar?.secure_url ?? avatarDefaultImg} />
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
        </div>
      </nav>
    </header >
  )
}

