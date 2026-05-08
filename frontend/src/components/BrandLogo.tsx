import { UI_TEXT } from '../config/uiText.ts'
import { useTheme } from '../contexts/ThemeContext.tsx'

export default function BrandLogo() {
  const { theme } = useTheme()
  const isDark = theme === 'luxury-dark'

  const ink = isDark ? '#f5f3ec' : '#171717'
  const dot = isDark ? '#d8b54a' : '#171717'
  const muted = isDark ? 'rgba(245,243,236,0.45)' : '#a3a3a3'
  const line = isDark ? 'rgba(216,181,74,0.72)' : 'rgba(23, 23, 23, 0.4)'

  return (
    <span className="inline-flex items-center gap-3.5 no-underline">
      <svg
        width="44"
        height="22"
        viewBox="0 0 44 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <line x1="4" y1="15.5" x2="40" y2="15.5" stroke={line} strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="13" cy="4.2" r="4.1" fill={dot} />
      </svg>

      <span className="inline-flex flex-col leading-none">
        <strong className="font-serif-blog text-[1rem] font-semibold tracking-[0.7em]" style={{ color: ink }}>
          {UI_TEXT.brand.brandTitle}
        </strong>
        <small
          className="mt-1 w-[2.15rem] text-[0.54rem] tracking-[0.04em] text-center"
          style={{ color: muted }}
        >
          {UI_TEXT.brand.brandSubtitle}
        </small>
      </span>
    </span>
  )
}

