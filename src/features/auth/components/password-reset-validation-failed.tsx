import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function PasswordResetValidationFailedCard() {
    const t = useTranslations('auth.passwordReset.onFail')

    return (
        <Card className="w-[90vw] sm:w-[400px]">
            <CardHeader>
                <CardTitle className="text-destructive">{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/forgotpassword" className="underline text-sky-500">
                    {t('loginLink')}
                </Link>
            </CardContent>
        </Card>
    )
}
