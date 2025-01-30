// lib
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// components
import { PostList } from './_components/post-list'

export default async function Home() {
    const session = await auth()
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    name: true,
                    atsign: true,
                },
            },
        },
    })

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
