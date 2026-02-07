import { createError, defineEventHandler, H3Error, H3Event } from '#imports'
import { COUNTRY_HEADER_NAME } from '~~/layers/00-service/server/utils/const'

const blockedCountries = ["RU", "BY"]

export default defineEventHandler((event: H3Event) => {
    const country = event.node.req.headers[COUNTRY_HEADER_NAME] as string

    if (blockedCountries.includes(country)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden'
        })
    }
})
