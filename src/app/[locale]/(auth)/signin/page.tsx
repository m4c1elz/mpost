import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import Link from 'next/link'
import { RegisterForm } from '@/features/auth/components/register-form'
import { useTranslations } from 'next-intl'

export default function SignIn() {
    const t = useTranslations('auth.register.form')

    return (
        <Card className="w-[300px]">
            <CardHeader className="text-center">
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <span className="font-medium text-sm">
                    {t('alreadyHasAccount')}{' '}
                    <Link href="/login" className="text-sky-500">
                        {t('loginHere')}
                    </Link>
                </span>
            </CardFooter>
        </Card>
    )
}
