import { createError, defineEventHandler, readBody, useNitroApp } from '#imports'
import { type BlogPostRequest } from '../../../shared/types/blog'
import { generateSlugFromTitle } from '~~/shared/utils'
import { getMetaInfo } from '../../utils/meta'
import { USER_ROLES } from '~~/layers/10-user/shared/types/user'

export default defineEventHandler(async (event) => {
    if (event.context.user?.roles?.includes(USER_ROLES.ADMIN) != true) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody<BlogPostRequest>(event)
    const title = (body?.title || '').trim()
    const markdown = body?.markdown || ''
    const status = body?.status || 'draft'

    if (!title) {
        throw createError({ statusCode: 400, statusMessage: 'title is required' })
    }

    const db = useNitroApp().db
    const now = new Date()
    const slug = generateSlugFromTitle(title)
    const metaInfo = getMetaInfo(markdown)

    try {
        await db.collection('blogPosts').insertOne({
            slug,
            title,
            owner_id: event.context.user!.userId,
            rawMarkdown: markdown,
            tags: metaInfo.tags,
            versions: [
                {
                    tags: metaInfo.tags,
                    editor_id: event.context.user!.userId,
                    markdown,
                    createdAt: now,
                }
            ],
            status,
            createdAt: now,
            updatedAt: now,
        })
    } catch (e: any) {
        if (e?.code === 11000) {
            throw createError({ statusCode: 409, statusMessage: 'Slug already exists' })
        }
        throw createError({ statusCode: 500, statusMessage: 'Failed to create post' })
    }

    return { ok: true, slug }
})


