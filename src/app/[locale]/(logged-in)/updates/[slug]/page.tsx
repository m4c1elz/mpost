type Params = Promise<{
    slug: string
}>

export default async function UpdatePage({ params }: { params: Params }) {
    const { slug } = await params

    const { default: Markdown } = await import(
        `@/app/[locale]/(logged-in)/updates/_markdown/${slug}.md`
    )

    return <Markdown />
}

export function generateStaticParams() {
    const availableUpdatePages = ['v1.3.0']

    return availableUpdatePages.map(v => ({
        slug: v,
    }))
}
