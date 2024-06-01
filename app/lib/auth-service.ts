import * as jose from 'jose';
import { cookies } from 'next/headers'

export async function openSessionToken(token: string) {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

    const { payload } = await jose.jwtVerify(token, secret);

    return payload
}

export async function createSessionToken(payload = {}) {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const session = await new jose.SignJWT(payload).setProtectedHeader(
        {
            alg: 'HS256'
        }
    )
    .setExpirationTime('1d')
    .sign(secret);
    const { exp } = await openSessionToken(session);

    cookies().set('session', session, {
        expires: (exp as number) * 1000,
        path: '/'
    })
}