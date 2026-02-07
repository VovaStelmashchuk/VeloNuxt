import { defineEventHandler, getCookie, H3Event, readBody, useNitroApp } from '#imports'
import { COUNTRY_HEADER_NAME, TRACKING_COOKIE_NAME } from '~~/layers/00-service/server/utils/const'
import { type TrackRequest } from '~~/layers/11-analytics/shared/types/track_body'

export type TrackDBRecord = {
    action: string
    country: string
    data: Record<string, string>
    sessionKey: string
    timestamp: Date,
    userId?: string,
}

function saveTrackRecordInBackground(record: TrackDBRecord) {
    const nitroApp = useNitroApp()
    nitroApp.db.collection('tracking').insertOne(record)
}

export default defineEventHandler(async (event: H3Event) => {
    const sessionKey = getCookie(event, TRACKING_COOKIE_NAME) as string
    const trackRequest = await readBody<TrackRequest>(event)
    const userId = event.context.user?.userId

    const country = event.node.req.headers[COUNTRY_HEADER_NAME] as string

    const trackRecond: TrackDBRecord = {
        action: trackRequest.action,
        country: country,
        data: trackRequest.data,
        sessionKey: sessionKey,
        timestamp: new Date(),
        userId: userId || null,
    }

    saveTrackRecordInBackground(trackRecond)
})