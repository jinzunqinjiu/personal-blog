/** 列表页展示用的文章摘要（后续可对齐后端字段） */
export type BlogPostPreview = {
  id: string
  slug: string
  /** 顶部元信息展示，建议使用英文大类如 TECHNOLOGY */
  category: string
  title: string
  /** true 时使用主题蓝标题（与参考图一致可交替） */
  accentTitle?: boolean
  summary?: string
  publishedAt: string
  readingMinutes?: number
  likeCount?: number
  favoriteCount?: number
}
