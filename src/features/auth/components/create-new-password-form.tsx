'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { setNewPassword } from '../actions/set-new-password'
import { Loader2 } from 'lucide-react'
import { PasswordInput } from '@/components/password-input'
import { useTranslations } from 'next-intl'

type CreateNewPasswordFormProps = {
    userId: string
}

export function CreateNewPasswordForm({ userId }: CreateNewPasswordFormProps) {
    const [state, action, isPending] = useActionState(
        setNewPassword.bind(null, userId),
        undefined,
    )

    const t = useTranslations('auth.passwordReset.form')

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action} className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="password">{t('password.label')}</Label>
                        <PasswordInput
                            name="password"
                            placeholder={t('password.placeholder')}
                        />
                        {state && (
                            <span className="text-sm text-destructive font-bold py-1">
                                {state.errors.password}
                            </span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="confirm-password">
                            {t('confirmPassword.label')}
                        </Label>
                        <PasswordInput
                            name="confirm-password"
                            placeholder={t('confirmPassword.placeholder')}
                        />
                        {state && (
                            <span className="text-sm text-destructive font-bold py-1">
                                {state.errors.confirmPassword}
                            </span>
                        )}
                    </div>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" />{' '}
                                {t('submitButton.sending')}
                            </>
                        ) : (
                            t('submitButton.send')
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
