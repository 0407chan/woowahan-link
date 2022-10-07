import { useEffect, useState } from 'react'

type WindowSize = {
  width?: number
  height?: number
}

export type WindowType = 'MOBILE' | 'TABLET' | 'LABTOP' | 'DESKTOP'

const useWindowSize = (): {
  windowSize: WindowSize
  isMobile: () => boolean
  getCurrentWindow: () => WindowType
} => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = () => {
    if (windowSize.width === undefined) return false
    return windowSize.width <= 670
  }

  const getCurrentWindow = (): WindowType => {
    if (windowSize.width === undefined) return 'DESKTOP'

    if (windowSize.width <= 670) {
      return 'MOBILE'
    }
    if (windowSize.width > 670 && windowSize.width <= 995) {
      return 'TABLET'
    }
    if (windowSize.width > 995 && windowSize.width <= 1320) {
      return 'LABTOP'
    }

    return 'DESKTOP'
  }

  return {
    windowSize,
    isMobile,
    getCurrentWindow
  }
}

export default useWindowSize
