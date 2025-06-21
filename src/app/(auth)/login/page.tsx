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

export default async function Login() {
    return (
        <Card className="w-[300px]">
            <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>Entre com seu usuário.</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-center items-center">
                <Link
                    href="/forgotpassword"
                    className="font-medium text-sm text-sky-500"
                >
                    Esqueci minha senha
                </Link>
                <span className="font-medium text-sm">
                    Não possui conta?{' '}
                    <Link href="/signin" className="text-sky-500">
                        Registre-se aqui
                    </Link>
                </span>
            </CardFooter>
        </Card>
    )
}
