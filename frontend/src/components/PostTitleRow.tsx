import { Link } from 'react-router-dom'
import PostEngagementActions from './PostEngagementActions.tsx'
import type { BlogPostPreview } from '../types/post.ts'
import { formatDotDate } from '../utils/formatDotDate.ts'

export type PostTitleRowProps = {
  post: BlogPostPreview
  disableLink?: boolean
  className?: string
}

/**
 * 纯文字列表条目：分类 — 日期 — 衬线标题 — 摘要。无卡片、无分割线盒子。
 */
export function PostTitleRow({
  post,
  disableLink = false,
  className = '',
}: PostTitleRowProps) {
  const inner = (
    <>
      <div className="flex items-center gap-2 md:gap-2.5">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] md:text-xs">
          {post.category}
        </span>
        <span
          className="h-px w-9 shrink-0 self-center"
          style={{ backgroundColor: 'var(--line)' }}
          aria-hidden
        />
        <time
          className="shrink-0 text-xs tabular-nums text-[var(--text-muted)]"
          dateTime={post.publishedAt}
        >
          {formatDotDate(post.publishedAt)}
        </time>
      </div>

      {disableLink ? (
        <p
          className={`font-serif-blog mt-4 text-xl font-bold leading-snug md:mt-5 md:text-2xl md:leading-snug ${post.accentTitle ? 'text-[var(--accent)]' : 'text-[var(--text-heading)]'}`}
        >
          {post.title}
        </p>
      ) : (
        <Link
          to={`/posts/${post.slug}`}
          className={`font-serif-blog mt-4 block text-xl font-bold leading-snug no-underline transition-colors hover:text-[var(--accent)] md:mt-5 md:text-2xl md:leading-snug ${post.accentTitle ? 'text-[var(--accent)]' : 'text-[var(--text-heading)]'}`}
        >
          {post.title}
        </Link>
      )}

      {post.summary ? (
        <p className="prose-width mt-3 text-[0.9375rem] leading-[1.7] text-[var(--text)] md:mt-4 md:text-base md:leading-relaxed">
          {post.summary}
        </p>
      ) : null}

      <PostEngagementActions
        initialLikeCount={post.likeCount}
        initialFavoriteCount={post.favoriteCount}
      />
    </>
  )

  const blockClass = ['block py-9 text-left no-underline outline-none md:py-11', className].join(
    ' ',
  )

  return (
    <div className={`${blockClass} transition-colors focus-within:text-[var(--accent)]`} role="article">
      {inner}
    </div>
  )
}
