import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import RegisterForm from "../_components/register-form"

export default function SignIn() {
    return <Card className="w-[300px]">
        <CardHeader className="text-center">
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>Cadastre-se na plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
            <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center items-center">
            <span className="font-medium text-sm">Já possui conta? <Link href="/login" className="text-sky-500">Faça login aqui</Link></span>
        </CardFooter>
    </Card>
}