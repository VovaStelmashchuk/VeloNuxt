<template>
    <div class="my-4 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
        <div v-if="lang" class="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-b border-gray-700 font-mono">
            {{ lang }}
        </div>
        <pre class="overflow-x-auto p-4"><code class="text-sm font-mono text-gray-200 block">{{ value }}</code></pre>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    value: string;
    lang?: string;
}>();
</script>
