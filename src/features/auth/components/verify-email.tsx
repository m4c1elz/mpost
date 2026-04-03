import {
    Tailwind,
    Head,
    Html,
    Preview,
    Container,
    Text,
    Body,
    Font,
    Link,
    Hr,
} from '@react-email/components'
import { createTranslator } from 'next-intl'

interface VerifyEmailProps {
    redirectUrl: string
    locale: string
}

export default async function VerifyEmail({
    redirectUrl,
    locale,
}: VerifyEmailProps) {
    const t = createTranslator({
        messages: await import(`../../../messages/${locale}.json`),
        namespace: 'auth.emails.verifyAccount',
        locale,
    })

    return (
        <Html lang="pt-br">
            <Head>
                <Font fontFamily="Roboto" fallbackFontFamily="sans-serif" />
            </Head>
            <Preview>{t('preview')}</Preview>
            <Tailwind>
                <Body>
                    <Text className="text-center text-3xl font-bold">
                        MPost
                    </Text>
                    <Container>
                        <Text className="text-2xl font-bold">{t('title')}</Text>
                        <Text>
                            {t('description')}{' '}
                            <Link
                                href={redirectUrl}
                                className="text-sky-500 cursor-pointer"
                            >
                                {t('link')}
                            </Link>
                            .
                        </Text>
                        <Hr />
                        <Text className="text-center">{t('footerText')}</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
