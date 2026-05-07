import { useMemo, useState } from 'react'

import { getMockCommentsBySlug } from '../mocks/comments.ts'
import type { PostComment } from '../types/comment.ts'
import CommentComposer from './CommentComposer.tsx'
import CommentList from './CommentList.tsx'

type Props = {
  postSlug: string
}

export default function PostCommentsSection({ postSlug }: Props) {
  const initialComments = useMemo(() => getMockCommentsBySlug(postSlug), [postSlug])
  const [comments, setComments] = useState<PostComment[]>(initialComments)

  function addComment(content: string) {
    const next: PostComment = {
      id: crypto.randomUUID(),
      author: '你',
      content,
      createdAt: new Date().toISOString(),
    }
    setComments((prev) => [next, ...prev])
  }

  return (
    <section className="prose-width mt-10 border-t pt-8" style={{ borderColor: 'var(--line)' }}>
      <h2 className="font-serif-blog text-2xl" style={{ color: 'var(--text-heading)' }}>
        评论
      </h2>
      <CommentComposer onSubmit={addComment} />
      <CommentList comments={comments} />
    </section>
  )
}

