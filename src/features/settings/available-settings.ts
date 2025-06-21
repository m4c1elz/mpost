type Setting = {
    name: string
    href: string
}

export const availableSettings: Setting[] = [
    {
        name: 'Usuário',
        href: '/settings/user',
    },
    {
        name: 'Aparência',
        href: '/settings/appearance',
    },
]
