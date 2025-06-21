// lib
import { auth } from '@/auth'
import { AppPagination } from '@/components/app-pagination'

// components
import { PostList } from '@/features/posts/components/post-list'
import { getPosts } from '@/features/posts/services/get-posts'

interface HomeProps {
    searchParams: Promise<{
        page: string
    }>
}

export default async function Home({ searchParams }: HomeProps) {
    const [session, { page }] = await Promise.all([auth(), searchParams])

    const parsedPage = isNaN(Number(page)) ? 1 : Number(page)

    const result = await getPosts(parsedPage)

    const user = session?.user

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold">Bem-vindo, {user?.name}!</h1>
            <div className="space-y-4 mx-auto md:w-[500px]">
                <PostList posts={result.data} />
                <AppPagination
                    page={result.pagination.page}
                    totalPages={result.pagination.totalPages}
                />
            </div>
        </div>
    )
}
