import { Db, MongoClient } from 'mongodb'
import { defineNitroPlugin, useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const uri = config.mongoUri
const client = new MongoClient(uri)

export default defineNitroPlugin(async (nitroApp) => {
    nitroApp.logger.info('Connecting to MongoDB...')
    try {
        nitroApp.mongo = await client.connect()
        nitroApp.db = nitroApp.mongo.db()
        nitroApp.logger.info('Connected to MongoDB')

        const usersCollection = nitroApp.db.collection('users')

        await usersCollection.createIndex(
            { id: 1 },
            {
                unique: true,
                name: 'unique_user_id'
            }
        )

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
        nitroApp.logger.error('Failed to connect to MongoDB:', error)
    }
})

declare module 'nitropack' {
    interface NitroApp {
        mongo: MongoClient
        db: Db
    }
}
