import { createError, defineEventHandler, getRouterParam, useNitroApp } from '#imports'
import { parseMarkdown } from '#imports'
import { BlogPost } from '~~/layers/04-blog/shared/types/blog'

export default defineEventHandler(async (event): Promise<BlogPost> => {
    const user = event.context.user
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const slug = getRouterParam(event, 'slug')
    if (!slug) {
        throw createError({ statusCode: 400, statusMessage: 'Slug required' })
    }

    const db = useNitroApp().db
    const post = await db.collection('blogPosts').findOne(
        { slug },
        { projection: { _id: 0, slug: 1, title: 1, status: 1, rawMarkdown: 1, updatedAt: 1, createdAt: 1 } }
    )
    if (!post) {
        throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    }

    const ast = await parseMarkdown(post.rawMarkdown || '')

    return {
        ...(post as unknown as BlogPost),
        body: ast
    }
})


