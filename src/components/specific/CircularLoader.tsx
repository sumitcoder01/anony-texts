import { LoaderCircle } from "lucide-react";

export type CircularLoaderProps = {
    className?: string;
}

export const CircularLoader = ({ className }: CircularLoaderProps) => {
    return (
        <div className="text-center">
            <LoaderCircle className={className} />
        </div>
    )
}
