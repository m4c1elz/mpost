import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { CommentProps } from './comment'

interface UseCommentProps {
    initialHasReplies: boolean
    commentId: number
    parentId: number | null
}

async function getReplies(commentId: number) {
    const response = await fetch(`/api/comments/${commentId}/replies`)

    if (!response.ok) {
        throw new Error('Error finding comment replies')
    }

    const result: CommentProps[] = await response.json()
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

    const repliesQuery = useQuery({
        enabled: false,
        queryKey: ['comment-replies', { commentId, parentId }],
        queryFn: () => getReplies(commentId),
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
