"use client"
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import GoogleImage from "../../../public/google.svg";
import Image from "next/image";

export type GoogleButtonProps = {
    className?: string;
}

export const GoogleButton = ({ className = "" }: GoogleButtonProps) => {
    return (
        <Button className={`flex items-center justify-center gap-2 w-full mx-auto h-10 shadow-lg ${className}`} onClick={() => signIn("google", { callbackUrl: "/dashboard" })}><Image className="aspect-square" src={GoogleImage} height={25} width={25} alt="" /> <span className="text-lg font-semibold">Google</span></Button>
    )
}