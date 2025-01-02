'use server'
import { Session } from 'types/session'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'



const secretKey = process.env.SESSION_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(payload: Session) {

    const expiredAt = new Date(Date.now() + 7 * 24 * 3600 * 1000)

    const session = await new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);

    (await cookies()).set("session", session, {
        path: "/",
        expires: expiredAt,
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })
}

export async function getSession() {
    const sessionCookie = (await cookies()).get("session")?.value
    if (!sessionCookie) return null
    try {
        const session = await jose.jwtVerify(sessionCookie, encodedKey, { algorithms: ["HS256"] })
        return session.payload as Session
    } catch (error) {
        console.error(`Error verifying session: ${error}`)
        redirect("/auth?mode=login")
    }
}

export async function destroySession() {
    (await cookies()).delete("session")
    redirect("/")
}