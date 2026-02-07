<template>
    <div class="min-h-screen text-label-primary">
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-2xl mx-auto">
                <h1 class="text-3xl font-bold mb-8 text-accent-primary">
                    Профіль користувача
                </h1>

                <div class="bg-fill-secondary p-8 rounded-xl border border-separator-primary">
                    <div class="flex items-start gap-6">
                        <div class="flex-shrink-0">
                            <UserAvatar :name="user?.name" size="2xl" />
                        </div>
                        <div class="flex-1 flex flex-col justify-center gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-label-primary mb-1">
                                    {{ user?.name }}
                                </h2>
                                <p class="text-sm text-label-secondary">
                                    @{{ user?.username }}
                                </p>
                            </div>
                            <div>
                                <MainButton buttonStyle="secondary" size="M" icon="mdi:logout" @click="handleLogout">
                                    Logout
                                </MainButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta, navigateTo, useUser, trackEvent } from '#imports'
import { onMounted } from 'vue'

definePageMeta({
    layout: 'default',
})

const { user, isLoggedIn, fetchUser, logout } = useUser()

onMounted(async () => {
    trackEvent('page_view', { page: 'profile' })
    await fetchUser()

    if (!isLoggedIn.value) {
        navigateTo('/')
    }
})

const handleLogout = async () => {
    trackEvent('logout', { page: 'profile' })
    await logout()
}
</script>
