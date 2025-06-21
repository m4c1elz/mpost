import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import Link from 'next/link'

export default function PasswordResetSuccess() {
    return (
        <div className="grid w-screen h-screen place-content-center">
            <Card>
                <CardHeader>
                    <CardTitle>Senha alterada!</CardTitle>
                    <CardDescription>
                        Você pode agora realizar login na plataforma com sua
                        nova senha.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <Link
                            href="/login"
                            className="underline underline-offset-4 text-sky-500"
                        >
                            Realizar login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
