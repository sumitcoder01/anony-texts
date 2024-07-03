import { Eye as EyeIcon } from 'lucide-react';

export type EyeOpenIconProps = {
    className?: string;
}

export const EyeOpenIcon = ({ className = "" }: EyeOpenIconProps) => {
    return (
        <div>
            <EyeIcon className={className} />
        </div>
    )
}