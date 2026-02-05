<template>
    <component :is="ordered ? 'ol' : 'ul'" class="mb-4 pl-6" :class="ordered ? 'list-decimal' : 'list-disc'">
        <slot />
    </component>
</template>

<script setup lang="ts">
defineProps<{
    ordered?: boolean;
}>();
</script>
