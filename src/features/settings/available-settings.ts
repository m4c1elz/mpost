import { _Translator } from 'next-intl'

type Setting = {
    name: string
    href: string
}

// TODO: add a page to change the current locale
export const availableSettings = (t: _Translator): Setting[] => [
    {
        name: t('options.user.title'),
        href: '/settings/user',
    },
    {
        name: t('options.appearance.title'),
        href: '/settings/appearance',
    },
]
