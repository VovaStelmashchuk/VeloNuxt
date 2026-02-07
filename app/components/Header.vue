<template>
    <header class="bg-fill-secondary border-b border-separator-primary">
        <div class="container mx-auto px-6 py-4 flex items-center justify-between">
            <NuxtLink to="/"
                class="text-xl font-bold text-accent-primary hover:text-accent-primary/80 transition-colors">
                VeloNuxt
            </NuxtLink>

            <nav class="flex items-center gap-6">
                <NuxtLink to="/blog"
                    class="text-label-secondary hover:text-accent-primary transition-colors font-medium">
                    Blog
                </NuxtLink>
                <a href="https://github.com/VovaStelmashchuk/kickstart" target="_blank" rel="noopener noreferrer"
                    class="text-label-secondary hover:text-accent-primary transition-colors font-medium">
                    GitHub
                </a>
            </nav>

            <div class="flex items-center gap-4">
                <MainButton v-if="!user" button-style="secondary" size="M" label="Login" @click="startGoogleAuth" />
                <MainButton v-if="user?.roles?.includes(USER_ROLES.ADMIN)" button-style="secondary" size="M"
                    label="Admin" link="/admin" />
                <NuxtLink to="/profile">
                    <div v-if="user" class="flex items-center gap-3">
                        <span class="text-sm font-medium text-label-primary">
                            {{ user?.name }}
                        </span>
                        <UserAvatar :name="user?.name" size="md" />
                    </div>
                </NuxtLink>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '~~/layers/10-user/app/composables/useUser'
import { USER_ROLES } from '~~/layers/10-user/shared/types/user'

const { user } = useUser()

onMounted(() => {
    useUser().fetchUser()
})

const startGoogleAuth = async () => {
    try {
        const response = await $fetch<{ url: string }>('/api/auth/google/redirect')
        if (response.url) {
            window.location.href = response.url
        }
    } catch (e) {
        console.error('Failed to start Google Auth', e)
    }
}

const logout = async () => {
    try {
        await $fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/'
    } catch (e) {
        console.error('Failed to logout', e)
    }
}
</script>
