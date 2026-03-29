export const locales = ['pt-br', 'en'] as const
export const defaultLocale = 'en'

export type Locale = (typeof locales)[number]
