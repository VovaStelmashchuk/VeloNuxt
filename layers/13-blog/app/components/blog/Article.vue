<template>
    <div class="blog-article">
        <div v-if="pending" class="text-center py-12">
            <p class="text-accent-primary">Loading article...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
            <p class="text-red-500">Error loading article: {{ error.message }}</p>
        </div>

        <div v-else-if="content && content.body" class="prose max-w-none">
            <div v-if="content.tags && content.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                <MainBadge v-for="tag in content.tags" :key="tag.slug" :label="tag.name" variant="info" />
            </div>
            <h1 class="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">{{ content.title }}</h1>
            <BlogRenderer :nodes="content.body.children!!" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFetch, type BlogPost } from '#imports';

const props = defineProps<{
    slug: string;
}>();

const { data: content, pending, error } = await useFetch<BlogPost>(
    `/api/blog/${props.slug}`
);
</script>
