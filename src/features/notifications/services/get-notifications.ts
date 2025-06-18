type NotificationList = {
    id: string
    user: string
    message: string
    href: string
    createdAt: string
    isRead: boolean
}[]

export async function getNotifications() {
    const response = await fetch('/api/notifications')

    if (!response.ok) {
        throw new Error('Error finding notifications')
    }

    const result: NotificationList = await response.json()
    return result
}
