<script setup lang="ts">
import { computed, resolveComponent, h } from 'vue';

const props = defineProps<{
    nodes: any[];
}>();

// Utilities to resolve standard HTML tags and Custom Components
const resolveNodeComponent = (node: any) => {
    if (node.type === 'text') {
        return null; // Handled separately
    }

    // Handle Custom Directives
    if (['containerDirective', 'leafDirective', 'textDirective'].includes(node.type)) {
        // Convention: ::: info-alert -> ContentInfoAlert
        // We pascal case the name and prefix with Content
        const componentName = 'Content' + toPascalCase(node.name);
        try {
            // We use resolveComponent to find the global component
            // Note: Nuxt auto-imports components, so they are available globally
            return resolveComponent(componentName);
        } catch (e) {
            console.warn(`Component ${componentName} not found used for directive ${node.name}`);
            return 'div'; // Fallback
        }
    }

    // Handle Standard Markdown Elements
    switch (node.type) {
        case 'root': return 'div';
        case 'paragraph': return 'p';
        case 'heading': return `h${node.depth}`;
        case 'list': return node.ordered ? 'ol' : 'ul';
        case 'listItem': return 'li';
        case 'emphasis': return 'em';
        case 'strong': return 'strong';
        case 'delete': return 'del';
        case 'blockquote': return 'blockquote';
        case 'code': return 'pre'; // We might want a custom code block component later
        case 'link': return 'a';
        case 'image': return 'img';
        case 'thematicBreak': return 'hr';
        // Add more as needed
        default: return 'div';
    }
};

const toPascalCase = (str: string) => {
    return str.match(/[a-z0-9]+/gi)
        ?.map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
        .join('') || '';
};

// Helper to extract props
const getNodeProps = (node: any) => {
    const p: Record<string, any> = { ...node.props, ...node.attributes };

    if (node.type === 'link') {
        p.href = node.url;
        p.title = node.title;
    }

    if (node.type === 'image') {
        p.src = node.url;
        p.alt = node.alt;
    }

    return p;
};
</script>

<template>
    <template v-for="(node, index) in nodes" :key="index">
        <!-- Text Nodes -->
        <template v-if="node.type === 'text'">
            {{ node.value }}
        </template>

        <!-- Elements & Components -->
        <component v-else :is="resolveNodeComponent(node)" v-bind="getNodeProps(node)">
            <!-- Recursively render children -->
            <BlockRenderer v-if="node.children" :nodes="node.children" />

            <!-- Special case for Code blocks if we don't use a custom component yet -->
            <template v-if="node.type === 'code'">
                <code>{{ node.value }}</code>
            </template>
        </component>
    </template>
</template>
