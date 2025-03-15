import { useState, useRef, useCallback, useEffect } from 'react'

interface UseCommentProps {
    initialHasReplies: boolean
}

export function useComment({ initialHasReplies }: UseCommentProps) {
    const [formOpen, setFormOpen] = useState(false)
    const [hasReplies, setHasReplies] = useState(initialHasReplies)
    const [repliesHidden, setRepliesHidden] = useState(true)
    const formElementRef = useRef<HTMLFormElement>(null)

    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (
            formElementRef.current &&
            !formElementRef.current.contains(e.target as Node)
        ) {
            setFormOpen(false)
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
    }
}
