import type { BlogPostPreview } from '../types/post.ts'
import { PostTitleRow } from './PostTitleRow.tsx'

export type PostTitleListProps = {
  posts: BlogPostPreview[]
  className?: string
  emptyMessage?: string
}

/**
 * 纵向堆叠的文章列表容器，条目之间仅以留白分隔。
 */
export function PostTitleList({
  posts,
  className = '',
  emptyMessage = '暂无文章。',
}: PostTitleListProps) {
  if (posts.length === 0) {
    return <p className={`py-16 text-center text-[var(--text-muted)] ${className}`}>{emptyMessage}</p>
  }

  return (
    <ul className={`m-0 p-0 list-none ${className}`} style={{ borderColor: 'var(--line)' }}>
      {posts.map((post) => (
        <li key={post.id} className="list-none border-b" style={{ borderColor: 'var(--line)' }}>
          <PostTitleRow post={post} />
        </li>
      ))}
    </ul>
  )
}
