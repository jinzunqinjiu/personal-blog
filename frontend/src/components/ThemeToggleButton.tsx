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
      <span aria-hidden>{isDark ? '☾' : '☼'}</span>
    </button>
  )
}

