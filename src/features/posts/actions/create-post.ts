'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createPost as createPostFromDb } from '../services/create-post'
import { _Translator } from 'next-intl'
import { getTranslations } from 'next-intl/server'

const createPostSchema = (t: _Translator) =>
    z.string().max(140, t('maxChars')).nonempty(t('nonEmpty')).trim()

export async function createPost(_prevState: unknown, formData: FormData) {
    const session = await auth()
    const user = session!.user!
    const post = formData.get('post')

    const t = await getTranslations('posts.create.validation')

    const { success, data, error } = createPostSchema(t).safeParse(post)

    if (!success) {
        return {
            errors: error.flatten().formErrors,
        }
    }

    await createPostFromDb(data, user.email!)

    redirect('/')
}
