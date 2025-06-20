import { z } from 'zod'

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_FILE_SIZE = 500 * 1024

export const uploadProfilePictureSchema = z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, {
        message: 'Tamanho da imagem passa do limite de 500kb!',
    })
    .refine(file => ALLOWED_IMAGE_TYPES.includes(file.type), {
        message:
            'Arquivo enviado não é uma imagem. Por favor, envie uma imagem.',
    })
