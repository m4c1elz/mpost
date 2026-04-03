'use server'

import { auth } from '@/auth'
import { z } from 'zod'
import { updatePost } from '../services/update-post'
import { _Translator } from 'next-intl'
import { getTranslations } from 'next-intl/server'

const editPostSchema = (t: _Translator) =>
    z.string().trim().max(140, t('maxChars')).nonempty(t('nonEmpty'))

export async function editPost(
    id: number,
    _prevState: unknown,
    formData: FormData,
) {
    const session = await auth()
    const content = formData.get('content')

    const t = await getTranslations('posts.edit.validation')

    const { success, data, error } = editPostSchema(t).safeParse(content)

    if (!success) {
        return {
            success: false,
            error: error.flatten().formErrors,
        }
    }

    await updatePost(id, data, session?.user.id!)

    return { success: true, error: '' }
}
