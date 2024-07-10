import { Camera } from 'lucide-react';

export type CameraIconProps = {
    className?: string;
    color?: string;
}

export const CameraIcon = ({ className = "h-4 w-4", color = "white" }: CameraIconProps) => {
    return (
        <div>
            <Camera color={color} className={className} />
        </div>
    )
}