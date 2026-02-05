import { createError, defineEventHandler, getRouterParam, useNitroApp } from '#imports'
import { parseMarkdown } from '../../utils/markdown'
import { BlogPost, BlogTag } from '../../../shared/types/blog'
import { removeMetaInfo } from '../../utils/meta'

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
        { projection: { _id: 0, slug: 1, title: 1, status: 1, rawMarkdown: 1, updatedAt: 1, createdAt: 1, tags: 1 } }
    )
    if (!post) {
        throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    }

    console.log(post.rawMarkdown)
    const noMetaInfo = removeMetaInfo(post.rawMarkdown || '')

    console.log(noMetaInfo)

    const ast = await parseMarkdown(noMetaInfo)

    const tags: BlogTag[] = (post.tags || []).map((tagSlug: string) => ({
        name: tagSlug.replace(/_/g, ' ').replace(/-/g, ' '),
        slug: tagSlug
    }))

    const blogPost: BlogPost = {
        title: post.title,
        slug: post.slug,
        status: post.status,
        body: ast,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        tags: tags
    }

    return blogPost
})


