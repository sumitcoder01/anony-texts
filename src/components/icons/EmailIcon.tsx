import { Mail as MailIcon } from 'lucide-react';

export type EmailIconProps = {
    className?: string;
}

export const EmailIcon = ({ className = "" }: EmailIconProps) => {
    return (
        <div>
            <MailIcon className={className} />
        </div>
    )
}