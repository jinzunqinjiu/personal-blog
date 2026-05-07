import { useTheme } from '../contexts/ThemeContext.tsx'

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'luxury-dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? '切换为浅色主题' : '切换为黑金主题'}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
      style={{
        borderColor: 'var(--line)',
        color: isDark ? 'var(--gold)' : 'var(--text)',
        background: 'transparent',
      }}
    >
      {isDark ? (
        <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2.8V5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 18.8V21.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5.2 12H2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M21.2 12H18.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.36 5.64L16.66 7.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7.34 16.66L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.36 18.36L16.66 16.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7.34 7.34L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <span aria-hidden className="text-[20px] leading-none">
          ☾
        </span>
      )}
    </button>
  )
}

