export function getInitials(str: string) {
    const parts = str.split(' ')

    const initials = parts
        .map((parte) => parte.charAt(0).toUpperCase())
        .join('')

    return initials
}
