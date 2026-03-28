'use server'

import { auth } from '@/auth'
import { setPinnedPost } from '../services/set-pinned'
import { getPinnedPost } from '../services/get-pinned-post'
import { revalidatePath } from 'next/cache'

export async function togglePin(id: number, pin: boolean, _prevState: unknown) {
    try {
        const session = await auth()

        const userId = session?.user.id as string

        const alreadyPinnedPost = await getPinnedPost(userId)

        if (alreadyPinnedPost && pin) {
            await setPinnedPost(alreadyPinnedPost.id, false)
        }

        const result = await setPinnedPost(id, pin)

        if (result) {
            revalidatePath('/users/[user]')
            return {
                success: true,
                error: '',
            }
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error ? error?.message : 'Pinning post failed',
        }
    }
}
