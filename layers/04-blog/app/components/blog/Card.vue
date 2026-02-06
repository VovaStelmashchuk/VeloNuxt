<script setup lang="ts">
import type { BlogArticleDto } from '#layers/04-blog/app/types/blog'

defineProps<{
    article: BlogArticleDto
}>()
</script>

<template>
    <NuxtLink :to="`/blog/${article.slug}`"
        class="block group h-full bg-fill-secondary p-6 rounded-xl border border-separator-primary hover:border-accent-primary transition-colors">
        <h3 class="text-xl font-bold mb-3 group-hover:text-accent-primary transition-colors">
            {{ article.title }}
        </h3>

        <div class="mt-auto pt-4 flex items-center text-sm text-label-secondary">
            <time :datetime="new Date(article.createdAt).toISOString()">
                {{ new Date(article.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric'
                }) }}
            </time>
        </div>
    </NuxtLink>
</template>
