import { _Translator } from 'next-intl'
import { z } from 'zod'

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_FILE_SIZE = 500 * 1024

export const uploadProfilePictureSchema = (t: _Translator) =>
    z
        .instanceof(File)
        .refine(file => file.size <= MAX_FILE_SIZE, {
            message: t('imageTooLargeError'),
        })
        .refine(file => ALLOWED_IMAGE_TYPES.includes(file.type), {
            message: t('notAnImageError'),
        })
