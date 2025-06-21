import { env } from '@/env'
import { CreateNewPasswordForm } from '@/features/auth/components/create-new-password-form'
import { getUserById } from '@/features/users/services/get-user-by-id'
import jwt, { JwtPayload } from 'jsonwebtoken'

type ForgotPasswordTokenPageProps = {
    params: Promise<{ token: string }>
}

type Payload = {
    purpose: string
} & JwtPayload

export default async function ForgotPasswordTokenPage({
    params,
}: ForgotPasswordTokenPageProps) {
    const { token } = await params

    try {
        const decoded = jwt.verify(
            token,
            env.RESET_PASSWORD_JWT_SECRET
        ) as Payload

        if (decoded.purpose !== 'reset-password' || !decoded.sub) {
            throw new Error()
        }

        const user = await getUserById(decoded.sub)

        if (!user) throw new Error()

        return <CreateNewPasswordForm userId={user.id} />
    } catch (error) {
        console.log(error)
        return <h1>Token inválido!</h1>
    }
}
