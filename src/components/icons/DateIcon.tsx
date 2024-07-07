import { CalendarDays } from 'lucide-react';

export type DateIconProps = {
    className?: string;
}

export const DateIcon = ({ className = "h-4 w-4" }: DateIconProps) => {
    return (
        <div>
            <CalendarDays className={className} />
        </div>
    )
}
