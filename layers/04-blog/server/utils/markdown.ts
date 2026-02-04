import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import yaml from 'js-yaml';

// Define AST Node types for TypeScript
interface Node {
    type: string;
    children?: Node[];
    data?: Record<string, any>;
    attributes?: Record<string, any>;
    [key: string]: any;
}

// Custom plugin to process directives
function directiveTransformer() {
    return (tree: Node) => {
        visit(tree, ['containerDirective', 'leafDirective', 'textDirective'], (node) => {
            // 1. Convert directives to a cleaner structure
            // We'll keep the key data from directives: name (component name), attributes (props)
            const data = node.data || (node.data = {});

            // Extract inline attributes (remark-directive stores them in `node.attributes`)
            const attributes = node.attributes || {};

            // 2. Handle YAML body for containerDirectives
            if (node.type === 'containerDirective' && node.children) {
                // Look for the first child that is a generic paragraph containing text
                const firstChild = node.children[0];

                // Simple heuristic: if the first child is a paragraph with potentially YAML content
                if (firstChild && firstChild.type === 'paragraph' && firstChild.children && firstChild.children[0]?.type === 'text') {
                    const textContent = firstChild.children[0].value;

                    // Heuristic: Check if it looks like keys usually found in YAML (e.g. "key: value")
                    // Or explicitly check for a known pattern. 
                    // For this implementation, we try to parse it if it contains a verified YAML structure
                    // Effectively, we just try to parse the whole text. 
                    // Users must be careful not to write plain text if they want YAML parsing, 
                    // OR we could enforce a rule that the first block IS props.

                    // However, the prompt says: "If the directive has a body text that looks like YAML (contains colons/newlines)..."
                    if (textContent.includes(':') && textContent.includes('\n')) {
                        try {
                            const parsedYaml = yaml.load(textContent);
                            if (typeof parsedYaml === 'object' && parsedYaml !== null) {
                                // Merge parsed YAML into attributes
                                Object.assign(attributes, parsedYaml);
                                // Remove this child from the node processing since it was just configuration
                                node.children.shift();
                            }
                        } catch (e) {
                            // Not valid YAML, treat as regular content
                            // console.warn('Failed to parse YAML body in directive', e);
                        }
                    }
                }
            }

            // Assign the 'hName' (element name) and 'hProperties' (props) for rehype/rendering
            // But we are outputting raw AST for Vue to consume, so we normalize standard keys

            // Let's standardise the output node
            // We will leave the type as is (containerDirective etc) OR rename it to 'component'
            // To succeed "The client maps JSON nodes to Vue components", keeping the type distinct helps

            // Store props in a predictable place. 'attributes' is good for now.
            node.props = attributes;
        });
    };
}

// Cleaner plugin to remove unnecessary keys
function astCleaner() {
    return (tree: Node) => {
        visit(tree, (node) => {
            delete node.position;
            delete node.data; // recursive data often added by plugins

            // Rename directives to common 'component' type or keep them?
            // Let's keep specific directive types but Ensure they have a consistent 'name' property
            // remark-directive nodes have 'name' (e.g. 'product-card')
        });
    };
}

export const parseMarkdown = async (content: string) => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkDirective)
        .use(directiveTransformer)
        .use(astCleaner); // Use our custom cleaner

    const tree = processor.parse(content);
    return await processor.run(tree);
};
