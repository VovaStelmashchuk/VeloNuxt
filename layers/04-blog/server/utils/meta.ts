import yaml from 'js-yaml'

export interface MetaInfo {
    tags?: string[]
}

export const getMetaInfo = (markdown: string): MetaInfo => {
    // Regex to match frontmatter delimited by --- at the start of the file
    // Matches ---, newline, content, newline, ---
    const match = markdown.match(/^---\r?\n([\s\S]+?)\r?\n---/)

    if (!match) {
        return {}
    }

    try {
        const content = match[1]
        if (!content) {
            return {}
        }
        const parsed = yaml.load(content)

        if (typeof parsed === 'object' && parsed !== null) {
            return parsed as MetaInfo
        }
    } catch (e) {
        console.error('Failed to parse markdown frontmatter:', e)
    }

    return {}
}

export const removeMetaInfo = (markdown: string): string => {
    if (markdown.startsWith('---')) {
        const indexOfSecord = markdown.indexOf('---', 1)
        if (indexOfSecord !== -1) {
            return markdown.slice(indexOfSecord + 3)
        }
    }
    return markdown
} 
