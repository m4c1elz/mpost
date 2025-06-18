export async function markNotificationAsRead(id: string) {
    await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
    })
}
