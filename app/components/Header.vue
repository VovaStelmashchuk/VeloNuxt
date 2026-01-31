<template>
    <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <NuxtLink to="/home" class="text-3xl font-bold text-accent-primary hover:opacity-80 transition-opacity">
                    NU31
                </NuxtLink>
            </div>
            <div class="flex items-center space-x-4">
                <NuxtLink v-if="isLoggedIn" to="/profile"
                    class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <span class="text-sm font-medium text-label-primary">
                        {{ user?.name }}
                    </span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '~~/layers/01-user/app/composables/useUser'

const { user, isLoggedIn } = useUser()

onMounted(() => {
    useUser().fetchUser()
})
</script>
