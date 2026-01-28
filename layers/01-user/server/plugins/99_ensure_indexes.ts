import { defineNitroPlugin } from '#imports'

export default defineNitroPlugin(async (nitroApp) => {
    try {
        const usersCollection = nitroApp.db.collection('users')

        await usersCollection.createIndex(
            { id: 1 },
            {
                unique: true,
                name: 'unique_user_id'
            }
        )
    } catch (error) {
        nitroApp.logger.error('Failed to create user indexes:', error)
    }
})
