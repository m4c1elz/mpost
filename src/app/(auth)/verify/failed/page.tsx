import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import jwt from 'jsonwebtoken'
import { SendEmailButton } from '@/features/auth/components/send-email-button'
import { Toaster } from '@/components/ui/toaster'
import { sendVerificationEmail } from '@/features/auth/actions/send-verification-email'

interface SearchParams {
    token: string
}

export default async function VerificationFailed({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const { token } = await searchParams

    const { email } = jwt.decode(token) as { email: string }

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
                        <SendEmailButton
                            sendEmailAction={sendVerificationEmail.bind(
                                null,
                                email
                            )}
                        />
                    </CardContent>
                </Card>
            </div>
            <Toaster />
        </>
    )
}
