import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[150px] w-[275px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[275px]" />
                <Skeleton className="h-4 w-[225px]" />
            </div>
        </div>
    )
}