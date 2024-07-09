import { Camera  } from 'lucide-react';

export type CameraIconProps = {
    className?: string;
}

export const CameraIcon = ({ className = "h-4 w-4" }: CameraIconProps) => {
    return (
        <div>
            <Camera className={className} />
        </div>
    )
}