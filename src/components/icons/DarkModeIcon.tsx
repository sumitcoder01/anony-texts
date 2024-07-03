import { Moon as MoonIcon } from 'lucide-react';

export type DarkModeIconProps = {
    className?: string;
}

export const DarkModeIcon = ({ className = "" }: DarkModeIconProps) => {
    return (
        <div>
            <MoonIcon className={className} />
        </div>
    )
}