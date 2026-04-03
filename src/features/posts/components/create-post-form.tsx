'use client'

// components
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

// hooks
import { useActionState, useEffect, useState } from 'react'

// actions
import { createPost } from '@/features/posts/actions/create-post'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'

export function CreatePostForm() {
    const [state, action, isPending] = useActionState(createPost, undefined)
    const [charsInputted, setCharsInputted] = useState(0)

    const isReachingTextLimit = charsInputted > 80 && charsInputted < 140
    const isAtTextLimit = charsInputted === 140

    const { toast } = useToast()

    const t = useTranslations()

    useEffect(() => {
        if (state && state.errors) {
            toast({
                variant: 'destructive',
                description: state.errors,
            })
        }
    }, [state])

    return (
        <Form action={action} className="space-y-4">
            <Textarea
                name="post"
                placeholder={t('posts.create.placeholder')}
                onChange={({ target: { value } }) =>
                    setCharsInputted(value.length)
                }
                minLength={1}
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
                            <Loader2 className="animate-spin" />{' '}
                            {t('common.sendButton.sending')}
                        </>
                    ) : (
                        t('common.sendButton.send')
                    )}
                </Button>
            </div>
        </Form>
    )
}
