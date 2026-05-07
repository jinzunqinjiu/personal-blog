import type { PostComment } from '../types/comment.ts'

type Props = {
  comments: PostComment[]
}

function formatRelativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.max(1, Math.floor(diffMs / 60000))
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

export default function CommentList({ comments }: Props) {
  if (comments.length === 0) {
    return <p className="mt-4 text-sm text-[var(--text-muted)]">还没有评论，来写第一条吧。</p>
  }

  return (
    <ul className="mt-5 list-none space-y-6 p-0">
      {comments.map((comment) => (
        <li key={comment.id} className="py-1">
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              style={{ backgroundColor: 'color-mix(in srgb, var(--line) 65%, transparent)', color: 'var(--text-heading)' }}
            >
              {comment.author.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4">
                <strong className="text-[1rem] font-semibold" style={{ color: 'var(--text-heading)' }}>
                  {comment.author}
                </strong>
                <time className="text-sm text-[var(--text-muted)]">
                  {formatRelativeTime(comment.createdAt)}
                </time>
              </div>
              <p className="mt-3 text-[1rem] leading-relaxed text-[var(--text)]">{comment.content}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

