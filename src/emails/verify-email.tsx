import {
    Tailwind,
    Head,
    Html,
    Preview,
    Container,
    Text,
    Body,
    Heading,
    Font,
    Link,
    Hr,
} from '@react-email/components'

interface VerifyEmailProps {
    redirectUrl: string
}

export default function VerifyEmail({ redirectUrl }: VerifyEmailProps) {
    return (
        <Html lang="pt-br">
            <Head>
                <Font fontFamily="Roboto" fallbackFontFamily="sans-serif" />
            </Head>
            <Preview>Confirme seu e-mail</Preview>
            <Tailwind>
                <Body>
                    <Text className="text-center text-3xl font-bold">
                        MPost
                    </Text>
                    <Container>
                        <Text className="text-2xl font-bold">Falta pouco!</Text>
                        <Text>
                            Para se logar em sua conta no MPost, siga{' '}
                            <Link
                                href={redirectUrl}
                                className="text-sky-500 cursor-pointer"
                            >
                                este link
                            </Link>
                            .
                        </Text>
                        <Hr />
                        <Text className="text-center">Feito por Maciel.</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
