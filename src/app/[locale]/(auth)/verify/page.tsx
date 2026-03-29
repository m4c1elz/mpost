import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { sendVerificationEmail } from '@/features/auth/actions/send-verification-email'
import { SendEmailButton } from '@/features/auth/components/send-email-button'
import { getTranslations } from 'next-intl/server'

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
    const t = await getTranslations('auth.register.accountVerify')

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription className="max-w-96">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <SendEmailButton sendEmailAction={sendEmailAction} />
            </CardFooter>
        </Card>
    )
}
