import { useEffect, useState } from 'react'

type Size = 'sm' | 'md'

const fallbackText: Record<Size, string> = {
  sm: 'h-6 w-6 min-h-6 min-w-6 text-[10px]',
  md: 'h-8 w-8 min-h-8 min-w-8 text-xs',
}

const imgBox: Record<Size, string> = {
  sm: 'h-6 w-6 min-h-6 min-w-6',
  md: 'h-8 w-8 min-h-8 min-w-8',
}

type Props = {
  nickname: string
  src: string
  size?: Size
  className?: string
}

/** 圆形头像；加载失败时显示昵称首字占位 */
export default function AuthorAvatar({
  nickname,
  src,
  size = 'sm',
  className = '',
}: Props) {
  const [failed, setFailed] = useState(false)
  const trimmedSrc = src?.trim() ?? ''
  const initial = (nickname?.trim().slice(0, 1) || '?').toUpperCase()

  useEffect(() => {
    setFailed(false)
  }, [trimmedSrc])

  if (failed || !trimmedSrc) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold leading-none ring-1 ring-[var(--line)] ${fallbackText[size]} ${className}`}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--accent) 12%, var(--bg) 88%)',
          color: 'var(--accent)',
        }}
        aria-hidden
      >
        {initial}
      </span>
    )
  }

  return (
    <img
      src={trimmedSrc}
      alt={`${nickname} 的头像`}
      width={size === 'sm' ? 24 : 32}
      height={size === 'sm' ? 24 : 32}
      className={`shrink-0 rounded-full object-cover ring-1 ring-[var(--line)] ${imgBox[size]} ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
