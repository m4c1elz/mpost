'use client'

// components
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

// hooks
import { useActionState, useEffect, useState } from 'react'

// actions
import { createPost } from '@/actions/create-post'

export function CreatePostForm() {
    const [_, action, isPending] = useActionState(createPost, undefined)
    const [charsInputted, setCharsInputted] = useState(0)

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
                    charsInputted === 140 && 'text-destructive'
                }`}
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
