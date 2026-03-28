'use server'

import { auth } from '@/auth'
import { setPinnedPost } from '../services/set-pinned'
import { getPinnedPost } from '../services/get-pinned-post'

export async function pinPost(id: number, _prevState: unknown) {
    try {
        const session = await auth()

        const userId = session?.user.id as string

        const alreadyPinnedPost = await getPinnedPost(userId)

        if (alreadyPinnedPost) {
            await setPinnedPost(alreadyPinnedPost.id, false)
        }

        const result = await setPinnedPost(id, true)

        if (result) {
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
