'use server'
import { signOut } from '@/auth'

export async function logout(_prevState: any) {
    await signOut({
        redirectTo: '/login',
    })
}
