import Link from "next/link"
import { ThemeButton } from "../shared/ThemeButton";

export const AuthNavbar = () => {
    return (
        <header className="sticky mb-2 w-full h-24 bg-white dark:bg-black shadow-md rounded-lg z-50 top-0">
            <nav className="w-full h-full flex justify-center md:justify-between items-center px-10 gap-5 md:gap-10">
                <Link href="/" className="text-md sm:text-xl md:text-2xl text-start font-bold">Anony Texts</Link>
                <div className="flex justify-center md:justify-between items-center gap-5 md:gap-10 px-2">
                    <Link className="hover:font-semibold" href="/">Home</Link>
                    <ThemeButton />
                </div>
            </nav>
        </header >
    )
}
