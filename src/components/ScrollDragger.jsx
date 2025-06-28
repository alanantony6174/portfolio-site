// src/components/ScrollDragger.jsx

import React, { useRef, useState, useEffect } from 'react'
import { FaGripVertical } from 'react-icons/fa'

export default function ScrollDragger() {
  const trackRef = useRef(null)
  const handleRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  // Sync thumb position on page scroll
  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current
      const thumb = handleRef.current
      if (!track || !thumb) return
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const fraction = window.scrollY / maxScroll
      const maxThumb = track.clientHeight - thumb.clientHeight
      thumb.style.top = `${fraction * maxThumb}px`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Handle dragging
  useEffect(() => {
    const onPointerMove = e => {
      if (!dragging) return
      e.preventDefault()
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      const track = trackRef.current
      const thumb = handleRef.current
      if (!track || !thumb) return
      const { top, height } = track.getBoundingClientRect()
      let y = clientY - top - thumb.clientHeight / 2
      y = Math.max(0, Math.min(height - thumb.clientHeight, y))

      // Page scroll
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: (y / (height - thumb.clientHeight)) * maxScroll, behavior: 'auto' })

      // Thumb position
      thumb.style.top = `${y}px`
    }
    const onPointerUp = () => dragging && setDragging(false)

    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('touchmove', onPointerMove, { passive: false })
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('touchend', onPointerUp)
    return () => {
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      window.removeEventListener('touchend', onPointerUp)
    }
  }, [dragging])

  const onStart = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  return (
    <div
      ref={trackRef}
      className="fixed right-4 bottom-24 z-40 w-0 bg-transparent"
      style={{ top: '50vh' }}  // moved lower
    >
      <div
        ref={handleRef}
        onMouseDown={onStart}
        onTouchStart={onStart}
        className={`
          absolute -left-[14px] w-7 h-14 bg-white/90 dark:bg-gray-800 
          rounded-lg shadow-lg flex items-center justify-center 
          cursor-grab transition-transform duration-150
          hover:scale-110 focus-visible:outline-none
        `}
        style={{ top: 0 }}
      >
        <FaGripVertical className="text-gray-600 dark:text-gray-300" />
      </div>
    </div>
  )
}
