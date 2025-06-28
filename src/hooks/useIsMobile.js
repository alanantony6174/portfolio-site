// src/hooks/useIsMobile.js

import { useState, useEffect } from 'react'

export default function useIsMobile(breakpoint = 767) {
  // Synchronously read the media query on first render
  const mq = typeof window !== 'undefined'
    ? window.matchMedia(`(max-width: ${breakpoint}px)`)
    : { matches: false }

  const [isMobile, setIsMobile] = useState(mq.matches)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mq])

  return isMobile
}
