export interface BlogArticleDto {
    slug: string
    title: string
    status: 'draft' | 'published'
    updatedAt: string
    createdAt: string
}
