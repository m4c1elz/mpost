// lib
import { auth } from '@/auth'
import { AppPagination } from '@/components/app-pagination'
import { PostButton } from '@/components/post-button'

// components
import { PostList } from '@/features/posts/components/post-list'
import { getPosts } from '@/features/posts/services/get-posts'
import { getTranslations } from 'next-intl/server'

interface HomeProps {
    searchParams: Promise<{
        page: string
    }>
}

export default async function Home({ searchParams }: HomeProps) {
    const t = await getTranslations('home')
    const [session, { page }] = await Promise.all([auth(), searchParams])

    const parsedPage = isNaN(Number(page)) ? 1 : Number(page)

    const result = await getPosts(parsedPage)

    const user = session?.user

    return (
        <div className="space-y-6">
            <section className="flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    {t('welcomeText', { name: user?.name! })}
                </h1>
                <PostButton className="md:hidden" />
            </section>

            <div className="space-y-4 mx-auto md:w-[550px]">
                <PostList posts={result.data} />
                {result.pagination.totalPages > 1 && (
                    <AppPagination
                        page={result.pagination.page}
                        totalPages={result.pagination.totalPages}
                    />
                )}
            </div>
        </div>
    )
}
