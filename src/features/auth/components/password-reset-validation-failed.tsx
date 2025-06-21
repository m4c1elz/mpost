import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import Link from 'next/link'

export function PasswordResetValidationFailedCard() {
    return (
        <Card className="w-[90vw] sm:w-[400px]">
            <CardHeader>
                <CardTitle className="text-destructive">
                    URL enviado é inválido.
                </CardTitle>
                <CardDescription>
                    Você está acessando um link inválido de reinicialização de
                    senha. É possível que o URL tenha expirado. Faça o processo
                    de enviar o email novamente.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/forgotpassword" className="underline text-sky-500">
                    Tentar novamente
                </Link>
            </CardContent>
        </Card>
    )
}
