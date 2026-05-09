import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPostBySlug } from '../api/posts.ts'
import { getApiErrorMessage } from '../api/http.ts'
import AuthorAvatar from '../components/AuthorAvatar.tsx'
import PostCommentsSection from '../components/PostCommentsSection.tsx'
import PostEngagementActions from '../components/PostEngagementActions.tsx'
import { postCategoryLabel } from '../config/postCategories.ts'
import { formatDotDate } from '../utils/formatDotDate.ts'

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<{
    id: number
    slug: string
    category: string
    title: string
    summary: string | null
    content_md: string
    published_at: string
    author: { id: number; nickname: string; avatar_url: string }
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchPostBySlug(slug)
        setPost(data)
        setError(null)
      } catch (e) {
        setError(getApiErrorMessage(e))
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [slug])

  const html = useMemo(() => {
    const rendered = marked.parse(post?.content_md ?? '', { async: false, breaks: true })
    const htmlString = typeof rendered === 'string' ? rendered : ''
    return DOMPurify.sanitize(htmlString)
  }, [post?.content_md])

  if (loading) {
    return <div className="page-shell py-16 text-neutral-500">加载中...</div>
  }

  if (!post || error) {
    return (
      <div className="page-shell flex flex-1 flex-col items-center px-6 py-20 text-center md:px-8">
        <p className="text-neutral-500">{error || '找不到这篇文章。'}</p>
        <Link to="/" className="mt-6 text-sm font-semibold text-[var(--accent)] no-underline">
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <article className="page-shell flex w-full flex-1 flex-col pb-16 md:pb-24">
      <Link to="/" className="inline text-sm font-medium text-[var(--accent)] no-underline">
        ← 返回列表
      </Link>

      <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs md:mt-14 md:gap-x-4">
        <span className="flex min-w-0 max-w-full items-center gap-2">
          <AuthorAvatar nickname={post.author.nickname} src={post.author.avatar_url} size="md" />
          <span className="truncate font-medium text-neutral-800 dark:text-neutral-200">
            {post.author.nickname}
          </span>
        </span>
        <span className="select-none text-neutral-400 opacity-80 dark:text-neutral-500" aria-hidden>
          ·
        </span>
        <span className="shrink-0 text-[11px] font-semibold tracking-[0.12em] text-[var(--accent)] md:text-xs">
          {postCategoryLabel(post.category)}
        </span>
        <span className="select-none text-neutral-400 opacity-80 dark:text-neutral-500" aria-hidden>
          ·
        </span>
        <time
          className="shrink-0 tabular-nums text-neutral-500 dark:text-neutral-400"
          dateTime={post.published_at}
        >
          {formatDotDate(post.published_at)}
        </time>
      </div>

      <h1
        className="article-title mt-6 max-w-4xl text-pretty md:mt-8"
      >
        {post.title}
      </h1>

      {post.summary ? <p className="prose-width mt-8 text-neutral-500">{post.summary}</p> : null}
      <article
        className="prose-width mt-9 rounded-xl border border-neutral-200 p-5 text-[0.9375rem] leading-[1.8] text-neutral-700 md:mt-10 md:text-lg md:leading-[1.85] dark:border-neutral-700 dark:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <PostEngagementActions
        initialLikeCount={0}
        initialFavoriteCount={0}
      />
      <PostCommentsSection postSlug={post.slug} />
    </article>
  )
}
