import { defineEventHandler, getCookie, H3Event, readBody, useNitroApp } from '#imports'
import { saveTrackRecordInBackground, TrackDBRecord } from '~~/layers/03-analytics/server/tracking/add'
import { COUNTRY_HEADER_NAME, TRACKING_COOKIE_NAME } from '~~/layers/00-service/server/const'
import { TrackRequest } from '~~/layers/03-analytics/shared/types/track_body'

export default defineEventHandler(async (event: H3Event) => {
    const sessionKey = getCookie(event, TRACKING_COOKIE_NAME) as string
    const trackRequest = await readBody<TrackRequest>(event)
    const userId = event.context.user.userId

    const country = event.node.req.headers[COUNTRY_HEADER_NAME] as string

    const trackRecond: TrackDBRecord = {
        action: trackRequest.action,
        country: country,
        data: trackRequest.data,
        sessionKey: sessionKey,
        timestamp: new Date(),
        userId: userId,
    }

    saveTrackRecordInBackground(trackRecond)
})