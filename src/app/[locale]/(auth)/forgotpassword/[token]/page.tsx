import { env } from '@/env'
import { CreateNewPasswordForm } from '@/features/auth/components/create-new-password-form'
import { PasswordResetValidationFailedCard } from '@/features/auth/components/password-reset-validation-failed'
import { validateJWT } from '@/features/auth/lib/jwt'
import { getUserById } from '@/features/users/services/get-user-by-id'

type ForgotPasswordTokenPageProps = {
    params: Promise<{ token: string }>
}

export default async function ForgotPasswordTokenPage({
    params,
}: ForgotPasswordTokenPageProps) {
    const { token } = await params

    try {
        const { payload } = await validateJWT<{ purpose: string }>(
            token,
            env.RESET_PASSWORD_JWT_SECRET,
        )

        if (payload.purpose !== 'reset-password' || !payload.sub) {
            throw new Error()
        }

        const user = await getUserById(payload.sub)

        if (!user) throw new Error()

        return <CreateNewPasswordForm userId={user.id} />
    } catch (error) {
        console.log(error)
        return <PasswordResetValidationFailedCard />
    }
}
