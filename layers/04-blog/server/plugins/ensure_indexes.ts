import { defineNitroPlugin } from '#imports'

export default defineNitroPlugin(async (nitroApp) => {
    try {
        const blogPosts = nitroApp.db.collection('blogPosts')
        await blogPosts.createIndex(
            { slug: 1 },
            {
                unique: true,
                name: 'unique_blog_slug'
            }
        )
        await blogPosts.createIndex(
            { status: 1, updatedAt: -1 },
            {
                name: 'status_updatedAt_idx'
            }
        )
    } catch (error) {
        nitroApp.logger.error('Failed to create blog indexes:', error)
    }
})
