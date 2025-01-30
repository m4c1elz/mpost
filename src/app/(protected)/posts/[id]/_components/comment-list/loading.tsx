import { Skeleton } from '@/components/ui/skeleton'

export function CommentListLoading() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16" />
        </div>
    )
}
