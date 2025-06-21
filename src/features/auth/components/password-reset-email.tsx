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

interface PasswordResetEmailProps {
    redirectUrl: string
}

export default function PasswordResetEmail({
    redirectUrl,
}: PasswordResetEmailProps) {
    return (
        <Html lang="pt-br">
            <Head>
                <Font fontFamily="Roboto" fallbackFontFamily="sans-serif" />
            </Head>
            <Preview>Reinicie sua senha</Preview>
            <Tailwind>
                <Body>
                    <Text className="text-center text-3xl font-bold">
                        MPost
                    </Text>
                    <Container>
                        <Text className="text-2xl font-bold">
                            Redefinir sua senha
                        </Text>
                        <Text>
                            Para continuar o processo de reinicialização de
                            senha, siga{' '}
                            <Link
                                href={redirectUrl}
                                className="text-sky-500 cursor-pointer"
                            >
                                este link
                            </Link>
                            .
                        </Text>
                        <Text>
                            Se não foi você que solicitou por este e-mail,
                            ignore-o.
                        </Text>
                        <Hr />
                        <Text className="text-center">Feito por Maciel.</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
