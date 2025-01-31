'use client'

// components
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

// hooks
import { useActionState, useState } from 'react'

// actions
import { createPost } from '@/actions/create-post'

export function CreatePostForm() {
    const [_, action, isPending] = useActionState(createPost, undefined)
    const [charsInputted, setCharsInputted] = useState(0)

    const isReachingTextLimit = charsInputted > 80 && charsInputted < 140
    const isAtTextLimit = charsInputted === 140

    return (
        <Form action={action} className="space-y-4">
            <Textarea
                name="post"
                placeholder="Lorem ipsum dolor it sit amet."
                onChange={({ target: { value } }) =>
                    setCharsInputted(value.length)
                }
                maxLength={140}
            />
            <span
                className={`text-xs block ${
                    isAtTextLimit && 'text-destructive'
                } ${isReachingTextLimit && 'text-amber-500'}`}
            >
                {charsInputted}/140
            </span>
            <div className="flex justify-end">
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" /> Enviando...
                        </>
                    ) : (
                        'Enviar'
                    )}
                </Button>
            </div>
        </Form>
    )
}
