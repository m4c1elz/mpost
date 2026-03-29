import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function VerificationSuccess() {
    const t = useTranslations('auth.register.accountVerify.success')

    return (
        <div className="grid w-screen h-screen place-content-center">
            <Card>
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <Link
                            href="/login"
                            className="underline underline-offset-4 text-sky-500"
                        >
                            {t('loginLink')}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
