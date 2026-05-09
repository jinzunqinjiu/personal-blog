export type PostCreateBody = {
  title: string
  category: string
  summary?: string
  content_md: string
}

export type PostAuthor = {
  id: number
  nickname: string
  avatar_url: string
}

export type PostResponse = {
  id: number
  author_id: number
  author: PostAuthor
  title: string
  slug: string
  category: string
  summary: string | null
  content_md: string
  published_at: string
}
