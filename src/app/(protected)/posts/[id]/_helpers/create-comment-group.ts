type Comments = {
    id: number
    parentId: number | null
    createdAt: Date
    updatedAt: Date
    content: string
    user: {
        atsign: string
        name: string
    }
}[]

export function createCommentGroup(postComments: Comments) {
    if (!postComments) {
        return {}
    }

    const group: Record<number | string, Comments> = {}
    postComments.forEach(comment => {
        group[comment.parentId || 'root'] ||= []
        group[comment.parentId || 'root'].push(comment)
    })

    return group
}
