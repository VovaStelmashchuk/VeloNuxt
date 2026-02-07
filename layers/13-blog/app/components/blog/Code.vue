<template>
    <div class="my-4 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 relative">
        <div v-if="lang" class="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-b border-gray-700 font-mono">
            <span>{{ lang }}</span>
        </div>
        <pre class="overflow-x-auto p-4"><code class="text-sm font-mono text-gray-200 block">{{ value }}</code></pre>
        <div class="absolute top-2 right-2 z-10">
            <MainButton size="S" buttonStyle="ghost" :icon="copied ? 'mdi:check' : 'mdi:content-copy'"
                @click="copyToClipboard" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    value: string;
    lang?: string;
}>();

const copied = ref(false);

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.value);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
};
</script>
