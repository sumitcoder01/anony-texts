import { RefreshCcw } from 'lucide-react';

export type RefreshIconProps = {
    className?: string;
}

export const RefreshIcon = ({ className = "" }: RefreshIconProps) => {
    return (
        <div>
            <RefreshCcw className={className} />
        </div>
    )
}