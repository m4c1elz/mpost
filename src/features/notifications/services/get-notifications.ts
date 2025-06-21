type NotificationList = {
    id: string
    user: string
    message: string
    href: string
    createdAt: string
    isRead: boolean
}[]

type GetNotificationsResponse = {
    data: NotificationList
    pagination: {
        page: number
        limit: number
        totalPages: number
        totalItems: number
    }
}

export async function getNotifications({ pageParam }: { pageParam: number }) {
    const queryParams = new URLSearchParams()
    queryParams.set('page', String(pageParam))

    const endpoint = '/api/notifications'

    const url = [endpoint, queryParams.toString()].join('?')

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Error finding notifications')
    }

    const result: GetNotificationsResponse = await response.json()
    return result
}
