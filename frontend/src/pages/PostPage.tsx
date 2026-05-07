import { Link, useParams } from 'react-router-dom'
import PostCommentsSection from '../components/PostCommentsSection.tsx'
import PostEngagementActions from '../components/PostEngagementActions.tsx'
import { getPostBySlug } from '../mocks/posts.ts'
import { formatDotDate } from '../utils/formatDotDate.ts'

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="page-shell flex flex-1 flex-col items-center px-6 py-20 text-center md:px-8">
        <p className="text-neutral-500">找不到这篇文章。</p>
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

      <div className="mt-12 flex flex-wrap items-center gap-2 md:mt-14 md:gap-2.5">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] md:text-xs">
          {post.category}
        </span>
        <span
          className="h-px w-9 shrink-0 self-center bg-neutral-300 dark:bg-neutral-600"
          aria-hidden
        />
        <time
          className="shrink-0 text-xs tabular-nums text-neutral-400 dark:text-neutral-500"
          dateTime={post.publishedAt}
        >
          {formatDotDate(post.publishedAt)}
          {post.readingMinutes != null ? ` · ${post.readingMinutes} 分钟` : ''}
        </time>
      </div>

      <h1
        className={`article-title mt-6 max-w-4xl text-pretty md:mt-8 ${post.accentTitle ? 'text-[var(--accent)]' : ''}`}
      >
        {post.title}
      </h1>

      <div className="prose-width mt-9 space-y-5 text-[0.9375rem] leading-[1.8] text-neutral-600 md:mt-10 md:space-y-6 md:text-lg md:leading-[1.85] dark:text-neutral-400">
        <p className="text-pretty">{post.summary}</p>
        <p className="text-pretty text-sm text-neutral-400 dark:text-neutral-500">
          正文与 Markdown 渲染尚未接入；接入后可在此处展示全文。
        </p>
      </div>

      <PostEngagementActions
        initialLikeCount={post.likeCount}
        initialFavoriteCount={post.favoriteCount}
      />
      <PostCommentsSection postSlug={post.slug} />
    </article>
  )
}
