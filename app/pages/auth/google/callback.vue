<template>
    <div class="h-screen flex items-center justify-center">
        <div class="animate-pulse flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-slate-200 mb-4"></div>
            <div class="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta, onMounted, useRoute, useRouter } from '#imports'

definePageMeta({
    layout: 'void',
})

const router = useRouter()
const route = useRoute()

onMounted(async () => {
    const hash = route.hash.substring(1)
    const params = hash.split('&').reduce((acc, item) => {
        const [key, value] = item.split('=')
        acc[key] = value
        return acc
    }, {} as Record<string, string>)

    const accessToken = params.access_token

    if (!accessToken) {
        console.error('No access token found')
        router.push('/')
        return
    }

    try {
        await $fetch('/api/auth/google/login', {
            method: 'POST',
            body: {
                googleAccessToken: accessToken,
            },
        })

        window.location.href = '/'
    } catch (e) {
        console.error('Login failed', e)
        router.push('/')
    }
})
</script>
