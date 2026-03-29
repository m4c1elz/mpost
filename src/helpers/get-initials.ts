export function getInitials(str: string) {
    const parts = str.split(' ')

    const initials = parts
        .map(parte => parte.charAt(0).toUpperCase())
        .join('')
        .slice(0, 1)

    return initials
}
