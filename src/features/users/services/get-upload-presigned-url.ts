export async function getUploadPresignedUrl(data: {
    name: string
    type: string
}) {
    const res = await fetch('/api/user/profile/update-image', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) throw new Error()

    const { url } = (await res.json()) as { url: string }
    return url
}
