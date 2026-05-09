/** 列表页展示用的文章摘要（后续可对齐后端字段） */
export type BlogPostPreview = {
  id: string
  slug: string
  /** 分类存库可为英文枚举；列表/详情用 postCategoryLabel 展示中文 */
  category: string
  /** 作者昵称 */
  authorNickname: string
  /** 作者头像 URL（如 Gravatar） */
  authorAvatarUrl: string
  title: string
  /** true 时使用主题蓝标题（与参考图一致可交替） */
  accentTitle?: boolean
  summary?: string
  publishedAt: string
  readingMinutes?: number
  likeCount?: number
  favoriteCount?: number
}
