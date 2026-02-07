import { defineEventHandler, useNitroApp } from '#imports'
import type { UserSession } from '~~/layers/10-user/server/core/user/user'
import type { UserDto, UserEntity } from '#layers/10-user/shared/types/user'

export default defineEventHandler(async (event): Promise<UserDto | null> => {
    const userSession = event.context.user as UserSession | undefined

    if (!userSession) {
        return null
    }

    const db = useNitroApp().db
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne<UserEntity>({ id: userSession.userId })

    if (!user) {
        return null
    }

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        roles: user.roles || []
    }
})
