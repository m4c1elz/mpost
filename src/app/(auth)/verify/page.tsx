import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { sendVerificationEmail } from '@/features/auth/actions/send-verification-email'
import { SendEmailButton } from '@/features/auth/components/send-email-button'

type VerifyUserPageProps = {
    searchParams: Promise<{
        email: string
    }>
}

export default async function VerifyUserPage({
    searchParams,
}: VerifyUserPageProps) {
    const { email } = await searchParams
    const sendEmailAction = sendVerificationEmail.bind(null, email)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quase lá! Verifique sua conta</CardTitle>
                <CardDescription className="max-w-96">
                    É necessário que você verifique sua conta antes de começar a
                    usá-la. Um e-mail será enviado para você com o link de
                    verificação.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <SendEmailButton sendEmailAction={sendEmailAction} />
            </CardFooter>
        </Card>
    )
}
