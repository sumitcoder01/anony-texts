import { Lock as LockIcon } from 'lucide-react';

export type PasswordIconProps = {
    className?: string;
}

export const PasswordIcon = ({ className = "" }: PasswordIconProps) => {
    return (
        <div>
            <LockIcon className={className} />
        </div>
    )
}