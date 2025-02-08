'use client'

// components
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from './ui/dialog'
import { Button } from './ui/button'
import { Loader2, Trash } from 'lucide-react'

// hooks
import { startTransition, useActionState, useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { usePathname, useRouter } from 'next/navigation'

// action
import { deletePost } from '@/actions/post/delete-post'

interface DeletePostButtonProps {
    id: number
}

export function DeletePostButton({ id }: DeletePostButtonProps) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()

    const deletePostAction = deletePost.bind(null, id)

    const [state, action, isPending] = useActionState(
        deletePostAction,
        undefined
    )

    useEffect(() => {
        if (state) {
            if (state.success) {
                if (pathname.includes('/posts')) {
                    router.replace('/')
                } else {
                    setOpen(false)
                    router.refresh()
                }

                toast({
                    description: 'Postagem excluída.',
                })
            } else {
                toast({
                    title: 'Erro!',
                    description: state.error,
                })
            }
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Trash className="text-destructive" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deseja mesmo excluir a postagem?</DialogTitle>
                    <DialogDescription>
                        Esta ação é irreversível!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        variant="destructive"
                        onClick={() => startTransition(action)}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" />{' '}
                                Excluindo...
                            </>
                        ) : (
                            'Excluir'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
