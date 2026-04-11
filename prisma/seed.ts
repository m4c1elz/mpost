import { fakerPT_BR as faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'
import { createInterface } from 'node:readline/promises'
import { hash } from 'bcrypt-ts'

const prisma = new PrismaClient()

async function createUser(): Promise<Prisma.UserCreateManyInput> {
    const firstName = faker.person.firstName()
    const email = faker.internet.email({
        firstName,
        provider: 'maciel.app',
    })
    const passwordHash = await hash('password', 10)

    return {
        name: firstName,
        atsign: firstName.toLowerCase().slice(0, 10),
        email,
        password: passwordHash,
        isVerified: true,
    }
}

async function seed() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    console.log(
        'This will delete everything from the database and insert new fake data.',
    )
    const response = (
        await rl.question('Proceed? (N for "No"):')
    ).toLocaleUpperCase()

    if (response === 'N') {
        console.log('Seeding canceled.')
        process.exit()
    }

    console.log('Seeding...')

    // database reset
    await prisma.user.deleteMany()
    await prisma.post.deleteMany()
    await prisma.comment.deleteMany()

    // creating users
    const userArray = await Promise.all(
        Array.from({ length: 50 }).map(() => createUser()),
    )

    await prisma.user.createMany({
        data: userArray,
        skipDuplicates: true,
    })

    const users = await prisma.user.findMany()

    // creating posts
    const postList = users.map<Prisma.PostCreateManyInput>(user => ({
        content: faker.lorem.words(10),
        isEdited: faker.helpers.arrayElement([true, false]),
        userId: user.id,
    }))

    await prisma.post.createMany({
        data: postList,
    })

    // creating comments (parents)
    const posts = await prisma.post.findMany()

    const commentList: Prisma.CommentCreateManyInput[] = []

    for (const post of posts) {
        const commentCount = faker.helpers.rangeToNumber({ min: 2, max: 5 })

        const comments = Array.from({ length: commentCount }).map(() => ({
            content: faker.lorem.words(10),
            userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
            postId: post.id,
        }))

        commentList.push(...comments)
    }

    await prisma.comment.createMany({
        data: commentList,
    })

    // creating comments (replies)
    const comments = await prisma.comment.findMany()

    const replyList: Prisma.CommentCreateManyInput[] = []

    for (const comment of comments) {
        // every comment should have none or 2 replies.
        const commentCount = faker.helpers.rangeToNumber({ min: 0, max: 2 })

        const comments = Array.from({ length: commentCount }).map(() => ({
            content: faker.lorem.words(10),
            userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
            postId: comment.postId,
            parentId: comment.id,
        }))

        replyList.push(...comments)
    }

    await prisma.comment.createMany({
        data: replyList,
    })

    console.log('Database seeding completed.')
    process.exit()
}

seed()
