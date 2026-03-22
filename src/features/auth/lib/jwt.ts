import { JWTPayload, SignJWT, jwtVerify } from 'jose'

export function signJWT(
    payload: JWTPayload,
    exp: string | number | Date,
    secret: string,
) {
    const encodedSecret = new TextEncoder().encode(secret)

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(exp)
        .sign(encodedSecret)
}

export function validateJWT(jwt: string, secret: string) {
    const encodedSecret = new TextEncoder().encode(secret)

    return jwtVerify(jwt, encodedSecret)
}
