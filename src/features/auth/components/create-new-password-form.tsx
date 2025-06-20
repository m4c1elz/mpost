'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreateNewPasswordForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar nova senha</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="password">Nova senha</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="senha123"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="confirm-password">
                            Confirmar senha
                        </Label>
                        <Input
                            type="password"
                            name="confirm-password"
                            placeholder="senha123"
                        />
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </CardContent>
        </Card>
    )
}
