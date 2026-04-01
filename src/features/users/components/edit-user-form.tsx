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
import { useTranslations } from 'next-intl'

interface EditUserFormProps {
    defaultName: string
    defaultAtsign: string
    defaultStatus?: string
    defaultUrl?: string
}

export function EditUserForm({
    defaultAtsign,
    defaultName,
    defaultStatus,
    defaultUrl,
}: EditUserFormProps) {
    const [state, action, isPending] = useActionState(editUser, undefined)
    const { update } = useSession()
    const router = useRouter()
    const { toast } = useToast()
    const t = useTranslations('settings.options.user.info.form')

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
                <Label>{t('name.label')}</Label>
                <Input
                    type="text"
                    placeholder={t('name.placeholder')}
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
                <Label>{t('username.label')}</Label>
                <Input
                    type="text"
                    placeholder={t('username.placeholder')}
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
                <Label>{t('status.label')}</Label>
                <Input
                    type="text"
                    placeholder={t('status.placeholder')}
                    defaultValue={defaultStatus}
                    name="status"
                />
                {state && (
                    <span className="text-sm text-destructive">
                        {state.error?.status}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <Label>{t('externalUrl.label')}</Label>
                <Input
                    type="text"
                    placeholder={t('externalUrl.placeholder')}
                    defaultValue={defaultUrl}
                    name="url"
                />
                {state && (
                    <span className="text-sm text-destructive">
                        {state.error?.url}
                    </span>
                )}
            </div>
            <Button type="submit" className="w-min" disabled={isPending}>
                {t('buttons.sendButton.normal')}
            </Button>
        </Form>
    )
}
