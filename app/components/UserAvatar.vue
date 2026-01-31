<template>
    <div :class="[
        'flex items-center justify-center rounded-full font-bold select-none overflow-hidden shrink-0 bg-accent-primary text-background-primary',
        sizeClasses[size],
    ]">
        <span :class="textSizeClasses[size]">
            {{ initials }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    name?: string
    size?: 'md' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
    name: '',
    size: 'md',
})

const initials = computed(() => {
    if (!props.name) return '?'
    return props.name
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
})

const sizeClasses = {
    md: 'w-10 h-10',
    '2xl': 'w-32 h-32',
}

const textSizeClasses = {
    md: 'text-sm',
    '2xl': 'text-4xl',
}
</script>
