<template>
    <NuxtLink :to="url" class="text-blue-600 hover:underline font-medium" :title="title">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    url: string;
    title?: string;
}>();
</script>
