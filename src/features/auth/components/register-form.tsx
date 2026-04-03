'use client'

// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import Form from 'next/form'

// actions
import { register } from '../actions/register'

// hooks
import { useActionState } from 'react'
import { PasswordInput } from '@/components/password-input'
import { useTranslations } from 'next-intl'

export function RegisterForm() {
    const [state, action, isPending] = useActionState(register, undefined)
    const t = useTranslations('auth.register.form')

    return (
        <div className="space-y-2">
            <Form action={action} className="space-y-4">
                <div className="space-y-2">
                    <Label>{t('email.label')}</Label>
                    <Input
                        type="text"
                        name="email"
                        placeholder={t('email.placeholder')}
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.email}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>{t('name.label')}</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder={t('name.placeholder')}
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.name}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>{t('username.label')}</Label>
                    <Input
                        type="text"
                        name="atsign"
                        placeholder={t('username.placeholder')}
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.atsign}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>{t('password.label')}</Label>
                    <PasswordInput
                        name="password"
                        placeholder={t('password.placeholder')}
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.password}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>{t('confirmPassword.label')}</Label>
                    <PasswordInput
                        name="confirm-password"
                        placeholder={t('confirmPassword.placeholder')}
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.confirmPassword}
                        </span>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />{' '}
                            {t('sendButton.sending')}
                        </>
                    ) : (
                        t('sendButton.send')
                    )}
                </Button>
            </Form>
        </div>
    )
}
