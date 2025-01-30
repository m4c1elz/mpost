'use client'

// components
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// hooks
import { useActionState } from 'react'

// actions
import { login } from '@/actions/login'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
    const [state, action, isPending] = useActionState(login, undefined)

    return (
        <Form action={action} className="space-y-4">
            <div className="space-y-2">
                <Label>E-mail</Label>
                <Input
                    type="text"
                    name="email"
                    placeholder="felipemmaciel06@gmail.com"
                    required
                />
                {state && (
                    <span className="text-sm text-destructive font-bold py-1">
                        {state.errors.email}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <Label>Senha</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="senha123"
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
                        <Loader2 className="animate-spin" /> Enviando...
                    </>
                ) : (
                    'Enviar'
                )}
            </Button>
        </Form>
    )
}
