'use client'

import { addComment as addCommentFn } from '@/actions/comment/add-comment'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Plus } from 'lucide-react'
import { Ref, useActionState, useEffect } from 'react'

interface AddCommentFormProps {
    postId: number
    parentId?: number
    ref?: Ref<HTMLFormElement>
    onSuccess?: () => void
}

export function AddCommentForm({
    parentId,
    postId,
    ref,
    onSuccess,
}: AddCommentFormProps) {
    const addComment = (_prevState: unknown, formData: FormData) => {
        return addCommentFn(postId, _prevState, formData, parentId)
    }

    const [state, action, isPending] = useActionState(addComment, undefined)

    useEffect(() => {
        if (state?.success && onSuccess) {
            onSuccess()
        }
    }, [state])

    return (
        <form action={action} className="space-y-2" ref={ref}>
            <Textarea required placeholder="Comente aqui!" name="content" />
            <Button type="submit" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" /> Comentar
                    </>
                ) : (
                    <>
                        <Plus /> Comentar
                    </>
                )}
            </Button>
        </form>
    )
}
