export type BlogTag = {
    name: string
    slug: string
}
export interface BlogPost {
    title: string
    slug: string
    status: string
    body: BlogRootNode
    createdAt: Date
    updatedAt: Date
    tags: BlogTag[]
}

export interface BlogPostRequest {
    title: string
    markdown: string
    status: 'draft' | 'published'
}

export type BlogNode =
    | BlogRootNode
    | BlogTextNode
    | BlogParagraphNode
    | BlogHeadingNode
    | BlogListNode
    | BlogListItemNode
    | BlogLinkNode
    | BlogImageNode
    | BlogCodeNode
    | BlogComponentNode
    | BlogBlockquoteNode
    | BlogHRNode
    | BlogStrongNode
    | BlogEmphasisNode
    | BlogDeleteNode
    | BlogInlineCodeNode

export interface BlogNodeBase {
    type: string
    children?: BlogNode[]
}

export interface BlogRootNode extends BlogNodeBase {
    type: 'root'
}

export interface BlogTextNode {
    type: 'text'
    value: string
}

export interface BlogParagraphNode extends BlogNodeBase {
    type: 'paragraph'
}

export interface BlogHeadingNode extends BlogNodeBase {
    type: 'heading'
    depth: 1 | 2 | 3 | 4 | 5 | 6
}

export interface BlogListNode extends BlogNodeBase {
    type: 'list'
    ordered: boolean
}

export interface BlogListItemNode extends BlogNodeBase {
    type: 'listItem'
}

export interface BlogLinkNode extends BlogNodeBase {
    type: 'link'
    url: string
    title?: string
}

export interface BlogImageNode extends BlogNodeBase {
    type: 'image'
    url: string
    alt?: string
    title?: string
}

export interface BlogCodeNode {
    type: 'code'
    lang?: string
    value: string
}

export interface BlogBlockquoteNode extends BlogNodeBase {
    type: 'blockquote'
}

export interface BlogHRNode {
    type: 'thematicBreak'
}

export interface BlogComponentNode extends BlogNodeBase {
    type: 'component'
    name: string
    props: Record<string, any>
}

export interface BlogStrongNode extends BlogNodeBase {
    type: 'strong'
}

export interface BlogEmphasisNode extends BlogNodeBase {
    type: 'emphasis'
}

export interface BlogDeleteNode extends BlogNodeBase {
    type: 'delete'
}

export interface BlogInlineCodeNode {
    type: 'inlineCode'
    value: string
}

export interface BlogResponse extends BlogPost { }
