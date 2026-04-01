'use client'

import { useActionState, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import Form from 'next/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Edit, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// action
import { editPost } from '../actions/edit-post'
import { usePost } from './post'
import { useTranslations } from 'next-intl'

export function EditPostButton() {
    const { id, content } = usePost()

    const editPostAction = editPost.bind(null, id)

    const [open, setOpen] = useState(false)
    const [state, action, isPending] = useActionState(editPostAction, undefined)
    const { toast } = useToast()
    const router = useRouter()

    const t = useTranslations()

    useEffect(() => {
        if (state && state.success) {
            setOpen(false)
            router.refresh()
            toast({
                description: t('posts.edit.onSuccessText'),
            })
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('posts.edit.title')}</DialogTitle>
                </DialogHeader>
                <Form action={action} id="edit-post-form" className="space-y-2">
                    <Label htmlFor="content">
                        {t('posts.edit.postContentLabel')}
                    </Label>
                    <Textarea
                        placeholder="hello world (editado!)"
                        name="content"
                        defaultValue={content}
                    />
                    {state && (
                        <span className="text-sm text-destructive block">
                            {state.error}
                        </span>
                    )}
                </Form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="edit-post-form"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" />{' '}
                                {t('common.sendButton.sending')}
                            </>
                        ) : (
                            t('common.sendButton.send')
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
