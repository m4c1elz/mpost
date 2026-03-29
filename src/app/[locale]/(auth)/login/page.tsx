import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import Link from 'next/link'
import { LoginForm } from '@/features/auth/components/login-form'
import { useTranslations } from 'next-intl'

export default function Login() {
    const t = useTranslations('auth.login.form')

    return (
        <Card className="w-[300px]">
            <CardHeader className="text-center">
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-center items-center">
                <Link
                    href="/forgotpassword"
                    className="font-medium text-sm text-sky-500"
                >
                    {t('forgotPassword')}
                </Link>
                <span className="font-medium text-sm text-center">
                    {t('registerNoAccount')}{' '}
                    <Link href="/signin" className="text-sky-500">
                        {t('registerHere')}
                    </Link>
                </span>
            </CardFooter>
        </Card>
    )
}
