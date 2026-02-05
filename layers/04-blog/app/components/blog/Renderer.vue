<script setup lang="ts">
import type { BlogNode } from '#imports';
import { resolveComponent } from 'vue';

defineProps<{
    nodes: BlogNode[];
}>();

const resolveCustomComponent = (node: any) => {
    // For custom directives (component type), we still need some dynamic resolution
    // unless the user wants us to list EVERY possible custom component here.
    // Assuming "explicit" mainly applies to the standard markdown nodes we just created.
    const componentName = 'Content' + toPascalCase(node.name);
    try {
        return resolveComponent(componentName);
    } catch (e) {
        return 'div';
    }
};

const toPascalCase = (str: string) => {
    return str.match(/[a-z0-9]+/gi)
        ?.map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
        .join('') || '';
};
</script>

<template>
    <template v-for="(node, index) in nodes" :key="index">
        <!-- Text -->
        <template v-if="node.type === 'text'">
            {{ node.value }}
        </template>

        <!-- Paragraph -->
        <BlogParagraph v-else-if="node.type === 'paragraph'">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </BlogParagraph>

        <!-- Heading -->
        <BlogHeading v-else-if="node.type === 'heading'" :depth="node.depth">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </BlogHeading>

        <!-- List -->
        <BlogList v-else-if="node.type === 'list'" :ordered="node.ordered">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </BlogList>

        <!-- ListItem -->
        <BlogListItem v-else-if="node.type === 'listItem'">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </BlogListItem>

        <!-- Link -->
        <BlogLink v-else-if="node.type === 'link'" :url="node.url" :title="node.title">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </BlogLink>

        <!-- Image -->
        <BlogImage v-else-if="node.type === 'image'" :url="node.url" :alt="node.alt" :title="node.title" />

        <!-- Blockquote -->
        <BlogBlockquote v-else-if="node.type === 'blockquote'">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </BlogBlockquote>

        <!-- Code -->
        <BlogCode v-else-if="node.type === 'code'" :value="node.value" :lang="node.lang" />

        <!-- Thematic Break -->
        <BlogThematicBreak v-else-if="node.type === 'thematicBreak'" />

        <!-- Emphasis (strong, em, del) - mapped as generic components or spans? -->
        <!-- User asked for simple code. Let's handle them inline or via dynamic component if strict types don't exist yet -->
        <strong v-else-if="node.type === 'strong'">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </strong>

        <em v-else-if="node.type === 'emphasis'">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </em>

        <del v-else-if="node.type === 'delete'">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </del>

        <!-- Custom Components (Directives) -->
        <component v-else-if="node.type === 'component'" :is="resolveCustomComponent(node)" v-bind="node.props">
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </component>

        <!-- Fallback/Root -->
        <div v-else>
            <BlogRenderer v-if="node.children" :nodes="node.children" />
        </div>
    </template>
</template>
