<script setup lang="ts">
import { useFetch, useHead } from '#imports'
import type { BlogArticleDto } from '#layers/04-blog/app/types/blog'

const { data } = await useFetch<{ items: BlogArticleDto[], total: number }>('/api/blog/published', {
    query: {
        page: 1,
        pageSize: 100
    }
})

useHead({
    title: 'Blog - VeloNuxt',
    meta: [
        { name: 'description', content: 'Latest articles and updates from VeloNuxt.' }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background-primary text-label-primary font-sans">
        <div class="container mx-auto px-6 py-16">
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Blog
                </h2>
                <p class="text-xl mb-8 text-label-secondary">
                    Latest articles and updates about VeloNuxt and web development
                </p>

                <div v-if="data?.items?.length" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <BlogCard v-for="article in data.items" :key="article.slug" :article="article" />
                </div>

                <div v-else class="text-center py-12 text-label-secondary">
                    No articles found.
                </div>
            </section>
        </div>
    </div>
</template>
