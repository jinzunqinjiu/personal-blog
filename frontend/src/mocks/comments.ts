import type { PostComment } from '../types/comment.ts'

const COMMENTS_BY_SLUG: Record<string, PostComment[]> = {
  'kyoto-morning': [
    {
      id: 'c-1',
      author: '林川',
      content: '这段京都晨光描写很有画面感，读着会自然放慢下来。',
      createdAt: '2026-05-06T08:40:00.000Z',
    },
    {
      id: 'c-2',
      author: 'Mia',
      content: '喜欢“往往比刻意风景更值得记住”这句。',
      createdAt: '2026-05-06T12:10:00.000Z',
    },
  ],
}

export function getMockCommentsBySlug(slug: string): PostComment[] {
  return COMMENTS_BY_SLUG[slug] ? [...COMMENTS_BY_SLUG[slug]] : []
}

