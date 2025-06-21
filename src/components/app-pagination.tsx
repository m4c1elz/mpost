'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

interface AppPaginationProps {
    page: number
    totalPages: number
}

export function AppPagination({ page, totalPages }: AppPaginationProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const hasPreviousPage = page > 1
    const hasNextPage = page < totalPages
    const isFirstPage = page - 1 == 0
    const isLastPage = page == totalPages

    function goToNextPage() {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page + 1))
        router.push(`${pathname}/?${params.toString()}`)
    }

    function goToPreviousPage() {
        const params = new URLSearchParams(searchParams.toString())
        if (page - 1 == 1) params.delete('page')
        else params.set('page', String(page - 1))
        router.push(`${pathname}/?${params.toString()}`)
    }

    return (
        <Pagination>
            <PaginationContent>
                {hasPreviousPage && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={goToPreviousPage}
                            className="hover:bg-foreground/20 cursor-pointer"
                        />
                    </PaginationItem>
                )}
                {!isFirstPage && (
                    <PaginationItem>
                        <PaginationLink
                            className="hover:bg-foreground/20 cursor-pointer"
                            onClick={goToPreviousPage}
                        >
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink
                        className="hover:bg-foreground/20 cursor-pointer"
                        isActive
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {!isLastPage && (
                    <PaginationItem>
                        <PaginationLink
                            onClick={goToNextPage}
                            className="hover:bg-foreground/20 cursor-pointer"
                        >
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {page + 1 < totalPages && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {hasNextPage && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={goToNextPage}
                            className="hover:bg-foreground/20 cursor-pointer"
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
