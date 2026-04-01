'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export function SetLanguageCard() {
    const locale = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations()

    function handleClick() {
        router.replace({ pathname }, { locale: selectedLocale })
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('settings.options.language.title')}</CardTitle>
                <CardDescription>
                    {t('settings.options.language.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Select
                    onValueChange={val => setSelectedLocale(val)}
                    defaultValue={locale}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pt-br">Português (PT-BR)</SelectItem>
                        <SelectItem value="en">English (EN)</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter>
                <Button onClick={() => handleClick()}>
                    {t('common.sendButton.send')}
                </Button>
            </CardFooter>
        </Card>
    )
}
