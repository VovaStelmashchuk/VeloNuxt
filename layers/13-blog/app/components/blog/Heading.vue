<template>
    <component :is="`h${depth}`" class="font-bold my-4 scroll-mt-20" :class="classes">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    depth: number | string; // unified might pass it as number, but good to be safe
}>();

const classes = computed(() => {
    switch (String(props.depth)) {
        case '1': return 'text-3xl border-b pb-2';
        case '2': return 'text-2xl border-b pb-1';
        case '3': return 'text-xl';
        case '4': return 'text-lg';
        default: return 'text-base font-bold';
    }
});
</script>
