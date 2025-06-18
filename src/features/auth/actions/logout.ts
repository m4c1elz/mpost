'use server'
import { signOut } from '@/auth'

export async function logout(_prevState: unknown) {
    await signOut({
        redirectTo: '/login',
    })
}
