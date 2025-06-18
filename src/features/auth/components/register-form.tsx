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

export function RegisterForm() {
    const [state, action, isPending] = useActionState(register, undefined)

    return (
        <div className="space-y-2">
            <Form action={action} className="space-y-4">
                <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="felipemmaciel06@gmail.com"
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.email}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Felipe Maciel"
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.name}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Apelido</Label>
                    <Input type="text" name="atsign" placeholder="maciel" />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.atsign}
                        </span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="senha123"
                    />
                    {state && (
                        <span className="text-sm text-destructive font-bold py-1">
                            {state.error.password}
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
        </div>
    )
}
