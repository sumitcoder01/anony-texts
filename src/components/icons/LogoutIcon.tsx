import { LogOut as LogOutIcon } from 'lucide-react';

export type LogoutIconProps = {
    className?: string;
}

export const LogoutIcon = ({ className = "" }: LogoutIconProps) => {
    return (
        <div>
            <LogOutIcon className={className} />
        </div>
    )
}