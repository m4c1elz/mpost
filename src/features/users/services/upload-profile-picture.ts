export async function uploadProfilePicture(data: File) {
    const formData = new FormData()

    formData.set('image', data)

    const res = await fetch('/api/user/profile/update-image', {
        method: 'POST',
        body: formData,
    })

    if (!res.ok) {
        const { error } = (await res.json()) as { error: string }
        throw new Error(error)
    }

    const { url } = (await res.json()) as { url: string }
    return url
}
