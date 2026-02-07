<template>
    <figure class="my-6">
        <img :src="url" :alt="alt" class="max-w-full h-auto rounded-lg shadow-md mx-auto" :title="title" />
        <figcaption v-if="title" class="text-center text-gray-500 text-sm mt-2">{{ title }}</figcaption>
    </figure>
</template>

<script setup lang="ts">
defineProps<{
    url: string;
    alt?: string;
    title?: string;
}>();
</script>
