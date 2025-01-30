import { useState, useRef, useCallback, useEffect } from 'react'

export function useCommentList() {
    const [formOpen, setFormOpen] = useState(false)
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
    }
}
