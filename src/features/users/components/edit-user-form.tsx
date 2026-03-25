'use client'

import { editUser } from '../actions/edit-user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Form from 'next/form'
import { useActionState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

interface EditUserFormProps {
    defaultName: string
    defaultAtsign: string
    defaultStatus?: string
}

export function EditUserForm({
    defaultAtsign,
    defaultName,
    defaultStatus,
}: EditUserFormProps) {
    const [state, action, isPending] = useActionState(editUser, undefined)
    const { update } = useSession()
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        if (state?.success) {
            ;(async () => {
                toast({
                    description: 'Usuário editado com sucesso.',
                })
                await update(state.user)
                router.refresh()
            })()
        }
    }, [state])

    return (
        <Form action={action} className="flex flex-col gap-4">
            <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                    type="text"
                    placeholder="Fulano Beltrano"
                    defaultValue={defaultName}
                    name="name"
                />
                {state && (
                    <span className="text-sm text-destructive">
                        {state.error?.name}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <Label>Apelido</Label>
                <Input
                    type="text"
                    placeholder="Fulano Beltrano"
                    defaultValue={defaultAtsign}
                    name="atsign"
                />
                {state && (
                    <span className="text-sm text-destructive">
                        {state.error?.atsign}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <Label>Status</Label>
                <Input
                    type="text"
                    placeholder="Me sentindo bem!"
                    defaultValue={defaultStatus ?? ''}
                    name="status"
                />
                {state && (
                    <span className="text-sm text-destructive">
                        {state.error?.status}
                    </span>
                )}
            </div>
            <Button type="submit" className="w-min" disabled={isPending}>
                Enviar
            </Button>
        </Form>
    )
}
