import { Sun as SunIcon } from 'lucide-react';

export type LightModeIconProps = {
    className?: string;
}

export const LightModeIcon = ({ className = "" }: LightModeIconProps) => {
    return (
        <div>
            <SunIcon className={className} />
        </div>
    )
}
