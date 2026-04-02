'use client'

// components
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// hooks
import { useActionState } from 'react'
import { useTranslations } from 'next-intl'

// actions
import { login } from '../actions/login'
import { Loader2 } from 'lucide-react'
import { PasswordInput } from '@/components/password-input'

export function LoginForm() {
    const [state, action, isPending] = useActionState(login, undefined)
    const t = useTranslations('auth.login.form')

    return (
        <Form action={action} className="space-y-4">
            <div className="space-y-2">
                <Label>{t('email.label')}</Label>
                <Input
                    type="text"
                    name="email"
                    placeholder={t('email.placeholder')}
                    required
                />
                {state && (
                    <span className="text-sm text-destructive font-bold py-1">
                        {state.errors.email}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <Label>{t('password.label')}</Label>
                <PasswordInput
                    name="password"
                    placeholder={t('password.placeholder')}
                    required
                />
                {state && (
                    <span className="text-sm text-destructive font-bold py-1">
                        {state.errors.password}
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
    )
}
