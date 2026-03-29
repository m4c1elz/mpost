import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import { SendEmailButton } from '@/features/auth/components/send-email-button'
import { Toaster } from '@/components/ui/toaster'
import { sendVerificationEmail } from '@/features/auth/actions/send-verification-email'
import { getTranslations } from 'next-intl/server'

interface SearchParams {
    email: string
}

export default async function VerificationFailed({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const { email } = await searchParams
    const t = await getTranslations('auth.register.accountVerify.failed')

    return (
        <>
            <div className="grid w-screen h-screen place-content-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-destructive">
                            {t('title')}
                        </CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SendEmailButton
                            sendEmailAction={sendVerificationEmail.bind(
                                null,
                                email,
                            )}
                        />
                    </CardContent>
                </Card>
            </div>
            <Toaster />
        </>
    )
}
