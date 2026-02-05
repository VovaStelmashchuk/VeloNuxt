<script setup lang="ts">
import type { BlogArticleDto } from '~/types/blog'

defineProps<{
    article: BlogArticleDto
}>()
</script>

<template>
    <NuxtLink :to="`/blog/${article.slug}`"
        class="block group h-full border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-white dark:bg-gray-900">
        <div class="p-6 flex flex-col h-full">
            <h3
                class="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ article.title }}
            </h3>

            <div class="mt-auto pt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <time :datetime="new Date(article.createdAt).toISOString()">
                    {{ new Date(article.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day:
                    'numeric' }) }}
                </time>
            </div>
        </div>
    </NuxtLink>
</template>
