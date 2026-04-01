import { _Translator } from 'next-intl'

type Setting = {
    name: string
    href: string
}

export const availableSettings = (t: _Translator): Setting[] => [
    {
        name: t('user.title'),
        href: '/settings/user',
    },
    {
        name: t('appearance.title'),
        href: '/settings/appearance',
    },
]
