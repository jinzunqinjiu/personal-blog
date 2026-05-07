import { useState } from 'react'

type Props = {
  initialLikeCount?: number
  initialFavoriteCount?: number
}

export default function PostEngagementActions({
  initialLikeCount = 0,
  initialFavoriteCount = 0,
}: Props) {
  const [liked, setLiked] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount)

  function toggleLike() {
    setLiked((prev) => {
      const next = !prev
      setLikeCount((count) => (next ? count + 1 : Math.max(0, count - 1)))
      return next
    })
  }

  function toggleFavorite() {
    setFavorited((prev) => {
      const next = !prev
      setFavoriteCount((count) => (next ? count + 1 : Math.max(0, count - 1)))
      return next
    })
  }

  const bookmarkColor = favorited ? 'var(--accent)' : 'var(--text-muted)'

  return (
    <div className="mt-6 flex items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
      <button
        type="button"
        onClick={toggleLike}
        className="inline-flex items-center gap-2 rounded px-1 py-0.5 transition-colors hover:text-[var(--accent)]"
        aria-pressed={liked}
      >
        <span aria-hidden style={{ color: liked ? '#ef4444' : undefined }}>
          {liked ? '♥' : '♡'}
        </span>
        <span className="tabular-nums">{likeCount}</span>
      </button>
      <button
        type="button"
        onClick={toggleFavorite}
        className="inline-flex items-center gap-2 rounded px-1 py-0.5 transition-colors hover:text-[var(--accent)]"
        aria-pressed={favorited}
      >
        <svg
          aria-hidden
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={favorited ? 'currentColor' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: bookmarkColor }}
        >
          <path
            d="M7 4.75C7 4.33579 7.33579 4 7.75 4H16.25C16.6642 4 17 4.33579 17 4.75V20L12 16.5L7 20V4.75Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span>{favorited ? '已收藏' : '收藏'}</span>
        <span className="tabular-nums">{favoriteCount}</span>
      </button>
    </div>
  )
}

