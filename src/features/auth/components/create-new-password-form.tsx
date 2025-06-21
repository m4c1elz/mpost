'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect } from 'react'
import { setNewPassword } from '../actions/set-new-password'
import { Loader2 } from 'lucide-react'
import { PasswordInput } from '@/components/password-input'

type CreateNewPasswordFormProps = {
    userId: string
}

export function CreateNewPasswordForm({ userId }: CreateNewPasswordFormProps) {
    const [state, action, isPending] = useActionState(
        setNewPassword.bind(null, userId),
        undefined
    )

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>Criar nova senha</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action} className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="password">Nova senha</Label>
                        <PasswordInput name="password" placeholder="senha123" />
                        {state && (
                            <span className="text-sm text-destructive font-bold py-1">
                                {state.errors.password}
                            </span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="confirm-password">
                            Confirmar senha
                        </Label>
                        <PasswordInput
                            name="confirm-password"
                            placeholder="senha123"
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
                                <Loader2 className="animate-spin" /> Enviando...
                            </>
                        ) : (
                            'Enviar'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
