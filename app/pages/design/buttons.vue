<template>
    <div class="min-h-screen bg-background-primary">
        <div class="container mx-auto px-6 py-16">
            <h1 class="text-4xl font-bold mb-8 text-accent-primary">
                Сторінка показує всі кнопки які є в дизайн системі сайту
            </h1>

            <ShowcaseButton />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { trackEvent } from '~~/layers/03-analytics/app/utils/track'

onMounted(() => {
    trackEvent('page_view', { page: 'design_sandbox_buttons' })
})
</script>
