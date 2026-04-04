export const locales = ['pt-br', 'en', 'pl-pl'] as const
export const defaultLocale = 'en'

export type Locale = (typeof locales)[number]
