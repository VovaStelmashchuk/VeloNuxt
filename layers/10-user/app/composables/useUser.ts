import { ref, computed } from 'vue'
import type { UserDto } from '#layers/10-user/shared/types/user'
export type { UserDto } from '#layers/10-user/shared/types/user'

const user = ref<UserDto | null>(null)
const isLoading = ref(false)

export const useUser = () => {
    const fetchUser = async () => {
        isLoading.value = true
        try {
            const response = await $fetch<UserDto | null>('/api/user/me', {
                credentials: 'include'
            })
            user.value = response
        } catch (error) {
            console.error('Failed to fetch user:', error)
            user.value = null
        } finally {
            isLoading.value = false
        }
    }

    const isLoggedIn = computed(() => user.value !== null)

    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            user.value = null
            window.location.href = '/'
        } catch (error) {
            console.error('Failed to logout:', error)
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            user.value = null
            window.location.href = '/'
        }
    }

    return {
        user,
        isLoggedIn,
        isLoading,

        fetchUser,
        logout,
    }
}

