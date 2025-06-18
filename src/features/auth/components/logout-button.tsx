'use client'

import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'

import { useActionState } from 'react'

import { logout } from '@/features/auth/actions/logout'
import Form from 'next/form'

export function LogoutButton() {
    const [, action, isPending] = useActionState(logout, undefined)

    return (
        <Form action={action}>
            <Button type="submit" variant="destructive">
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" /> Saindo...
                    </>
                ) : (
                    <>
                        <LogOut /> Sair
                    </>
                )}
            </Button>
        </Form>
    )
}
