import { Paperclip } from 'lucide-react';

export type FileIconProps = {
    className?: string;
}

export const FileIcon = ({ className = "h-4 w-4" }: FileIconProps) => {
    return (
        <div>
            <Paperclip className={className} />
        </div>
    )
}