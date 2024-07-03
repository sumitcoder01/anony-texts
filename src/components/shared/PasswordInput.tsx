"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { EyeCloseIcon } from '../icons/EyeCloseIcon';
import { EyeOpenIcon } from '../icons/EyeOpenIcon';

export type PasswordInputProps = {
    name: string;
    field: any;
}

export const PasswordInput = ({ name, field }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="relative">
            <Input type={showPassword ? "text" : "password"} {...field} name={name} />
            <div className="absolute inset-y-1/3 right-2 z-10 cursor-pointer" onClick={togglePassword}>
                {!showPassword ? <EyeCloseIcon className="h-4 w-4" /> : <EyeOpenIcon className="h-4 w-4" />}
            </div>
        </div>
    )
}
