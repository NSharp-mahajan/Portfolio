import React, { useEffect, useRef, useState } from 'react'
import './CursorEffect.css'

const CursorEffect = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isActive, setIsActive] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const inactivityTimerRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const updateCursor = () => {
      // Smooth cursor movement with easing
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1

      // Faster dot movement for trailing effect
      dotX += (mouseX - dotX) * 0.3
      dotY += (mouseY - dotY) * 0.3

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`

      animationFrameRef.current = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Reset inactivity timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }

      if (!isActive) {
        setIsActive(true)
      }

      // Set inactivity timer
      inactivityTimerRef.current = setTimeout(() => {
        setIsActive(false)
      }, 2000)
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
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isActive ? 'active' : 'inactive'} ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isActive ? 'active' : 'inactive'}`}
      />
    </>
  )
}

export default CursorEffect

