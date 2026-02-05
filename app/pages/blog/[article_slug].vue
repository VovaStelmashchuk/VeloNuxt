<template>
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <BlogArticle :slug="slug" />
    </div>
</template>

<script setup lang="ts">
import { createError, definePageMeta, useRoute } from '#imports'

definePageMeta({
    layout: 'default',
})

const route = useRoute()
const slug = route.params['article_slug'] as string

if (!slug) {
    throw createError({
        statusCode: 400,
        statusMessage: 'Markdown file name is required',
    })
}
</script>
