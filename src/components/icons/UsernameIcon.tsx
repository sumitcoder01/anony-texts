import { User as UserIcon } from 'lucide-react';

export type UsernameIconProps = {
    className?: string;
}

export const UsernameIcon = ({ className = "" }: UsernameIconProps) => {
    return (
        <div>
            <UserIcon className={className} />
        </div>
    )
}

