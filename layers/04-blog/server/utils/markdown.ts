import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import yaml from 'js-yaml';
import type { BlogNode, BlogRootNode } from '../../shared/types/blog';

// Define AST Node types for internal use (Remark nodes)
interface RemarkNode {
    type: string;
    children?: RemarkNode[];
    value?: string;
    depth?: number;
    ordered?: boolean;
    url?: string;
    title?: string;
    alt?: string;
    lang?: string;
    data?: Record<string, any>;
    attributes?: Record<string, any>;
    name?: string; // for directives
    [key: string]: any;
}

// Mapper function: Remark AST -> Blog Contract AST
const mapNode = (node: RemarkNode): BlogNode | null => {
    switch (node.type) {
        case 'root':
            return {
                type: 'root',
                children: mapChildren(node.children)
            } as BlogRootNode;

        case 'paragraph':
            return {
                type: 'paragraph',
                children: mapChildren(node.children)
            };

        case 'text':
            return {
                type: 'text',
                value: node.value || ''
            };

        case 'heading':
            return {
                type: 'heading',
                depth: (node.depth as any) || 1,
                children: mapChildren(node.children)
            };

        case 'list':
            return {
                type: 'list',
                ordered: node.ordered || false,
                children: mapChildren(node.children)
            };

        case 'listItem':
            return {
                type: 'listItem',
                children: mapChildren(node.children)
            };

        case 'link':
            return {
                type: 'link',
                url: node.url || '',
                title: node.title,
                children: mapChildren(node.children)
            };

        case 'image':
            return {
                type: 'image',
                url: node.url || '',
                alt: node.alt || node.title,
                title: node.title
            };

        case 'code':
            return {
                type: 'code',
                lang: node.lang,
                value: node.value || ''
            };

        case 'blockquote':
            return {
                type: 'blockquote',
                children: mapChildren(node.children)
            };

        case 'thematicBreak':
            return {
                type: 'thematicBreak'
            };

        // Custom Directives
        case 'containerDirective':
        case 'leafDirective':
        case 'textDirective': {
            // Extract props
            const props = node.attributes || {};

            // Handle YAML body for container directives
            // Logic: Check first child for YAML-like text if not already parsed
            // Since we are doing a direct map, we can check node.children here.

            let childrenToMap = node.children;

            if (node.type === 'containerDirective' && node.children && node.children.length > 0) {
                const firstChild = node.children[0];
                // Check if it is a paragraph with text
                if (firstChild.type === 'paragraph' && firstChild.children && firstChild.children[0]?.type === 'text') {
                    const textContent = firstChild.children[0].value || '';
                    if (textContent.includes(':') && textContent.includes('\n')) {
                        try {
                            const parsedYaml = yaml.load(textContent);
                            if (typeof parsedYaml === 'object' && parsedYaml !== null) {
                                Object.assign(props, parsedYaml);
                                // Skip first child (config)
                                childrenToMap = node.children.slice(1);
                            }
                        } catch (e) {
                            // ignore
                        }
                    }
                }
            }

            return {
                type: 'component',
                name: node.name || 'unknown',
                props: props,
                children: mapChildren(childrenToMap)
            };
        }

        // Emphasis, Strong, Delete are missing in Strict types for now?
        // We should map them to generic or update strict types. 
        // For now, let's treat them as their children? Or map to basic 'text' wrapper?
        // Wait, 'emphasis' and 'strong' are vital.
        // Let's assume the user strict contract allows them or we flatten them?
        // "Strict contract types (Paragraph, Heading, Component, etc.)"
        // I'll map them to a 'component' with name 'strong'/'em' if strictly following "Component" pattern
        // OR I should update `blog.ts` to include them. 
        // Given I am writing `markdown.ts` now, I will treat them as components for flexibility
        // or just recurse children if strict types don't support them yet (but that loses bold/italic).

        case 'emphasis':
        case 'strong':
        case 'delete':
            return {
                type: 'component',
                name: node.type, // 'emphasis', 'strong', 'delete' -> resolve to <em>, <strong>, <del>
                props: {},
                children: mapChildren(node.children)
            };

        default:
            // Skip unknown nodes or render children?
            // console.warn('Unknown node type:', node.type);
            // If it has children, try to render them, effectively unwrapping the node
            if (node.children) {
                // But we need to return a single node or array? 
                // mapNode returns single Node. 
                // We can't really return 'multiple nodes' from here.
                // So we return a 'fragment' or just null?
                // Let's return null and filter out.
                return null;
            }
            return null;
    }
};

const mapChildren = (children?: RemarkNode[]): BlogNode[] => {
    if (!children) return [];
    return children.map(mapNode).filter((n): n is BlogNode => n !== null);
};

export const parseMarkdown = async (content: string): Promise<BlogRootNode> => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkDirective);

    const tree = processor.parse(content);
    // remark AST (MDAST)
    const mdast = await processor.run(tree);

    // Custom Mapping
    const blogAst = mapNode(mdast as RemarkNode);

    if (blogAst && blogAst.type === 'root') {
        return blogAst as BlogRootNode;
    }

    // Fallback if root is somehow lost
    return {
        type: 'root',
        children: []
    };
};
