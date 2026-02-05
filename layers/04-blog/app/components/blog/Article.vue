<template>
    <div class="blog-article">
        <div v-if="pending" class="text-center py-12">
            <p class="text-accent-primary">Loading article...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
            <p class="text-red-500">Error loading article: {{ error.message }}</p>
        </div>

        <div v-else-if="content && content.body" class="prose max-w-none">
            <h1 class="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">{{ content.title }}</h1>
            <BlogRenderer :nodes="content.body.children!!" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFetch, type BlogPost } from '#imports';
// OR import type { BlogPost } from 'Layers...' if ContentResponse delegates to it.
// Assuming the API returns what useFetch expects. 
// Note: ContentResponse in 'shared/types/content' was updated to have 'body'.

const props = defineProps<{
    slug: string;
}>();

const { data: content, pending, error } = await useFetch<BlogPost>(
    `/api/blog/${props.slug}`
);
</script>
