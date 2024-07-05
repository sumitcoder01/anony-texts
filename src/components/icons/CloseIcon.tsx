import { X as CrossIcon } from 'lucide-react';

export type CloseIconProps = {
    className?: string;
}

export const CloseIcon = ({ className = "" }: CloseIconProps) => {
    return (
        <div>
            <CrossIcon className={className} />
        </div>
    )
}