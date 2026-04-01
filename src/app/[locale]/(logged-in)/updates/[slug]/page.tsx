import { notFound } from 'next/navigation'
import { versions } from '../versions'

type Params = Promise<{
    locale: string
    slug: string
}>

export default async function UpdatePage({ params }: { params: Params }) {
    const { locale, slug } = await params

    const { default: Markdown } = await import(
        `@/app/[locale]/(logged-in)/updates/_markdown/${locale}/${slug}.md`
    ).catch(() => notFound())

    return <Markdown />
}

export function generateStaticParams() {
    return versions.map(({ version }) => ({ slug: version }))
}
