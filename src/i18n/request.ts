import { Locale, locales } from '@/locales'
import { getRequestConfig } from 'next-intl/server'

const config = getRequestConfig(async ({ requestLocale }) => {
    const requested = (await requestLocale) ?? ''

    const locale = locales.includes(requested as Locale) ? requested : 'pt-br'

    return {
        messages: (await import(`../messages/${locale}.json`)).default,
        locale,
    }
})

export default config
