import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'luxury-dark'

type ThemeContextValue = {
  theme: ThemeMode
  toggleTheme: () => void
}

const STORAGE_KEY = 'muse-theme'

const ThemeContext = createContext<ThemeContextValue | null>(null)

/* eslint-disable react-refresh/only-export-components -- Provider 与 hook 成对导出 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'luxury-dark' ? 'luxury-dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => (prev === 'luxury-dark' ? 'light' : 'luxury-dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme 必须在 ThemeProvider 内使用')
  return ctx
}

