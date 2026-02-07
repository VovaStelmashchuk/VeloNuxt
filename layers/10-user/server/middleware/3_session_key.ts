import { defineEventHandler, getCookie, setCookie } from '#imports'
import { TRACKING_COOKIE_NAME } from '~~/layers/00-service/server/utils/const'
import { randomUUID } from 'crypto'

export default defineEventHandler((event) => {
    const sessionKey = getCookie(event, TRACKING_COOKIE_NAME)

    if (!sessionKey) {
        setCookie(event, TRACKING_COOKIE_NAME, randomUUID(), {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        })
    }
})
