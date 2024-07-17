import { SkeletonCard } from "../shared/SkeletonCard"

export const MessagesListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {
                [...Array(4)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))
            }
        </div>
    )
}