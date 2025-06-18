// lib
import { auth } from '@/auth'

// components
import { PostList } from '@/features/posts/components/post-list'
import { getPosts } from '@/features/posts/services/get-posts'

export default async function Home() {
    const session = await auth()
    const posts = await getPosts()

    const user = session?.user

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold">Bem-vindo, {user?.name}!</h1>
            <div className="space-y-4 mx-auto md:w-[500px]">
                <PostList posts={posts} />
            </div>
        </div>
    )
}
