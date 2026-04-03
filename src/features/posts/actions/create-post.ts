'use server'

import { auth } from '@/auth'
import { redirect } from '@/i18n/navigation'
import { z } from 'zod'
import { createPost as createPostFromDb } from '../services/create-post'
import { _Translator } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

const createPostSchema = (t: _Translator) =>
    z
        .string()
        .trim()
        .nonempty(t('nonEmpty'))
        .refine(post => post.replace(/\r\n/g, '\n').length <= 140, {
            message: t('maxChars'),
        })

export async function createPost(_prevState: unknown, formData: FormData) {
    const session = await auth()
    const locale = await getLocale()
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

    redirect({ href: '/', locale })
}
