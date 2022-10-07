import { useEffect, useState } from 'react'

export type ModeType = 'LIGHT'|'DARK'

export const useDarkMode = () => {
  const [theme, setTheme] = useState<ModeType>('LIGHT')

  const setMode = (mode:ModeType) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const themeToggler = () => {
    if (theme === 'LIGHT') {
      setMode('DARK')
      return
    }
    setMode('LIGHT')
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as ModeType
    if (localTheme) {
      setTheme(localTheme)
    }
  }, [])

  return { theme, themeToggler }
}
