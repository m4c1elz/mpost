'use client'

import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'

import { useActionState } from 'react'

import { logout } from '@/features/auth/actions/logout'
import Form from 'next/form'
import { useTranslations } from 'next-intl'

export function LogoutButton() {
    const [, action, isPending] = useActionState(logout, undefined)
    const t = useTranslations('auth.logoutButton')

    return (
        <Form action={action}>
            <Button type="submit" variant="destructive">
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" />{' '}
                        {t('loggingOutText')}
                    </>
                ) : (
                    <>
                        <LogOut /> {t('logoutText')}
                    </>
                )}
            </Button>
        </Form>
    )
}
