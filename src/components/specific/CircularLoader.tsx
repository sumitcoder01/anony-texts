import { LoaderCircle } from "lucide-react";

export type CircularLoaderProps = {
    className: string;
}

export const CircularLoader = ({ className }: CircularLoaderProps) => {
    return (
        <div className={className}>
            <LoaderCircle />
        </div>
    )
}
