import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useUser } from '~~/layers/01-user/app/composables/useUser'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isLoggedIn } = useUser()

    if (!isLoggedIn.value) {
        await navigateTo('/')
        return
    }
})

