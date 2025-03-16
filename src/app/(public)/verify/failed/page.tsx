import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { ResendEmailButton } from '@/components/resend-email-button'
import { Toaster } from '@/components/ui/toaster'

interface SearchParams {
    token: string
}

export default async function VerificationFailed({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const { token } = await searchParams

    const { id } = jwt.decode(token) as { id: string }

    const { email } = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: { email: true },
    })

    return (
        <>
            <div className="grid w-screen h-screen place-content-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-destructive">
                            Houve um erro ao verificar o email.
                        </CardTitle>
                        <CardDescription>
                            Tente solicitar um novo código de verificação e
                            tentar de novo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResendEmailButton {...{ id, email }} />
                    </CardContent>
                </Card>
            </div>
            <Toaster />
        </>
    )
}
