import { defineRouting } from 'next-intl/routing'

export const i18nRouting = defineRouting({
    locales: ['pt-br', 'en'],
    defaultLocale: 'en',
    localeDetection: true,
})
