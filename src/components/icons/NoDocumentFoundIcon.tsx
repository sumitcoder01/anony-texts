import { Rabbit as RabbitIcon } from 'lucide-react';

export type NoDocumentFoundIconProps = {
    className?: string;
    color?: string;
    strokeWidth?: number
}

export const NoDocumentFoundIcon = ({ color = "black", className = "h-20 w-20 animate-bounce", strokeWidth = 1.5 }: NoDocumentFoundIconProps) => {
    return (
        <div>
            <RabbitIcon strokeWidth={strokeWidth} color={color} className={className} absoluteStrokeWidth />
        </div>
    )
}