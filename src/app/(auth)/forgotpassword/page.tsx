import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { RequestPasswordResetForm } from '@/features/auth/components/request-password-reset-form'

export default async function ForgotPasswordPage() {
    return (
        <Card className="w-[90vw] sm:w-[400px]">
            <CardHeader>
                <CardTitle>Redefinir senha</CardTitle>
                <CardDescription className="max-w-96">
                    Para redefinir sua senha, um email será enviado para você
                    com um link de reinicialização de senha. Digite seu e-mail
                    abaixo:
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RequestPasswordResetForm />
            </CardContent>
        </Card>
    )
}
