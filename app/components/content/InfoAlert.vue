<script setup lang="ts">
defineProps<{
    type?: 'info' | 'warning' | 'error' | 'success';
    message?: string;
}>();
</script>

<template>
    <div class="p-4 rounded-md my-4 border-l-4" :class="{
        'bg-blue-50 border-blue-500 text-blue-700': type === 'info' || !type,
        'bg-yellow-50 border-yellow-500 text-yellow-700': type === 'warning',
        'bg-red-50 border-red-500 text-red-700': type === 'error',
        'bg-green-50 border-green-500 text-green-700': type === 'success',
    }">
        <p v-if="message" class="font-bold">{{ message }}</p>
        <div class="mt-2 text-sm">
            <slot />
        </div>
    </div>
</template>
