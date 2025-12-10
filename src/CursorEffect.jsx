import React, { useEffect, useRef, useState } from 'react'
import './CursorEffect.css'

const CursorEffect = () => {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    const smoothing = 0.18

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * smoothing
      cursorY += (mouseY - cursorY) * smoothing

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`

      animationFrameRef.current = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

    }

    const checkHover = (e) => {
      const target = e.target
      if (!target) {
        setIsHovering(false)
        return
      }

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.getAttribute('role') === 'button' ||
        target.style.cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.floating-icon') ||
        target.closest('.nav-icon') ||
        target.closest('.profile-picture') ||
        target.closest('.profile-icon') ||
        target.closest('.profile-badge') ||
        target.closest('.login-button') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(isClickable)
    }

    const handleMouseMoveWithHover = (e) => {
      handleMouseMove(e)
      checkHover(e)
    }

    // Start animation loop
    updateCursor()

    // Event listeners
    document.addEventListener('mousemove', handleMouseMoveWithHover)

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWithHover)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovering' : ''}`} />
    </>
  )
}

export default CursorEffect

