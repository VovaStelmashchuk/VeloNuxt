import { defineEventHandler, readBody, setResponseStatus, getRequestHeader, getCookie, setCookie, useNitroApp, useRuntimeConfig } from '#imports'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
    const { googleAccessToken } = await readBody(event)

    const url = new URL('https://www.googleapis.com/oauth2/v3/userinfo')
    url.searchParams.append('access_token', googleAccessToken as string)

    const data = await $fetch(url.toString())
    const { sub, email, name } = data as any

    if (!sub || !email || !name) {
        setResponseStatus(event, 401)
        return { error: 'Invalid access token' }
    }

    const userId = `google:${sub}`
    const db = useNitroApp().db

    const updateData = {
        $set: {
            provider: 'google',
            providerId: sub,
            email,
            name,
            username: email.split('@')[0],
        },
        $setOnInsert: {
            id: userId,
            createdAt: new Date(),
        }
    }

    await db.collection('users').updateOne(
        { id: userId },
        updateData,
        { upsert: true }
    )

    const sessionKey = randomUUID()
    const session = {
        sessionKey,
        createdAt: new Date(),
        userAgent: getRequestHeader(event, 'user-agent'),
        ip: getRequestHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress
    }

    await db.collection('users').updateOne(
        { id: userId },
        { $push: { sessions: session } as any }
    )

    const jwtSecret = useRuntimeConfig().jwtSecret
    const token = jwt.sign(
        { sessionKey, userId },
        jwtSecret,
        { expiresIn: '365d' }
    )

    setCookie(event, 'jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 365 * 24 * 60 * 60,
        path: '/'
    })

    return { success: true }
})
