import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { RequestPasswordResetForm } from '@/features/auth/components/request-password-reset-form'
import { getTranslations } from 'next-intl/server'

export default async function ForgotPasswordPage() {
    const t = await getTranslations('auth.passwordReset')

    return (
        <Card className="w-[90vw] sm:w-[400px]">
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription className="max-w-96">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RequestPasswordResetForm />
            </CardContent>
        </Card>
    )
}
