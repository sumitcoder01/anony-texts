import { EyeOff as EyeIcon } from 'lucide-react';

export type EyeCloseIconProps = {
    className?: string;
}

export const EyeCloseIcon = ({ className = "" }: EyeCloseIconProps) => {
    return (
        <div>
            <EyeIcon className={className} />
        </div>
    )
}