import { useEffect, useState } from 'react'
import { fetchPosts } from '../api/posts.ts'
import { getApiErrorMessage } from '../api/http.ts'
import { PostTitleList } from '../components/PostTitleList.tsx'
import { useTheme } from '../contexts/ThemeContext.tsx'
import type { BlogPostPreview } from '../types/post.ts'

function toPreview(post: {
  id: number
  slug: string
  category: string
  title: string
  summary: string | null
  published_at: string
  author: { nickname: string; avatar_url: string }
}): BlogPostPreview {
  return {
    id: String(post.id),
    slug: post.slug,
    category: post.category,
    authorNickname: post.author.nickname,
    authorAvatarUrl: post.author.avatar_url,
    title: post.title,
    summary: post.summary ?? undefined,
    publishedAt: post.published_at,
  }
}

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === 'luxury-dark'
  const [posts, setPosts] = useState<BlogPostPreview[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPosts()
        setPosts(data.map(toPreview))
        setError(null)
      } catch (e) {
        setError(getApiErrorMessage(e))
      }
    }
    void load()
  }, [])

  return (
    <div className="page-shell flex w-full flex-1 flex-col">
      <header className="mb-10 max-w-none md:mb-12 lg:mb-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] md:text-xs">
          {isDark ? 'Premium Journaling' : 'Sense the world'}
        </p>
        <h1 className="hero-title mt-4 md:mt-5">记录思考的温度。</h1>
        <p className="mt-5 font-serif-blog text-lg italic text-[var(--text-muted)] md:mt-6 md:text-xl">
          “在极简中，发现繁花似锦。”
        </p>
      </header>

      {error ? (
        <p className="py-10 text-sm text-red-500">{error}</p>
      ) : (
        <PostTitleList posts={posts} className="w-full flex-1" />
      )}
    </div>
  )
}
