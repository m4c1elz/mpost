import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { CommentProps } from './comment'
import { useInView } from 'react-intersection-observer'

interface UseCommentProps {
    initialHasReplies: boolean
    commentId: number
    parentId: number | null
}

export interface GetRepliesResponse {
    data: CommentProps[]
    pagination: {
        page: number
        limit: number
        totalPages: number
        totalItems: number
    }
}

async function getReplies(commentId: number, page = 1) {
    const params = new URLSearchParams()
    params.set('page', page.toString())

    const endpoint = `/api/comments/${commentId}/replies`

    const url = [endpoint, params.toString()].join('?')

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Error finding comment replies')
    }

    const result: GetRepliesResponse = await response.json()
    return result
}

export function useComment({
    initialHasReplies,
    commentId,
    parentId,
}: UseCommentProps) {
    const { commentId: highlightedCommentId } = useParams<{
        commentId: string
    }>()

    const isHighlighted = Number(highlightedCommentId) === commentId

    const searchParams = useSearchParams()
    const showRepliesByDefault = !!searchParams.get('showReplies')

    const [formOpen, setFormOpen] = useState(false)
    const [hasReplies, setHasReplies] = useState(initialHasReplies)
    const [repliesHidden, setRepliesHidden] = useState(!showRepliesByDefault)

    const formElementRef = useRef<HTMLFormElement>(null)

    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (
            formElementRef.current &&
            !formElementRef.current.contains(e.target as Node)
        ) {
            setFormOpen(false)
        }
    }, [])

    const repliesQuery = useInfiniteQuery({
        enabled: false,
        queryKey: ['comment-replies', { commentId, parentId }],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => getReplies(commentId, pageParam),
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPageParam < lastPage.pagination.totalPages) {
                return lastPage.pagination.page + 1
            } else {
                return null
            }
        },
    })

    useEffect(() => {
        if (!repliesHidden) {
            repliesQuery.refetch()
        }
    }, [])

    useEffect(() => {
        if (formOpen) {
            document.addEventListener('click', handleOutsideClick)
        } else {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [formOpen])

    return {
        formOpen,
        setFormOpen,
        formElementRef,
        repliesHidden,
        setRepliesHidden,
        hasReplies,
        setHasReplies,
        isHighlighted,
        repliesQuery,
    }
}
