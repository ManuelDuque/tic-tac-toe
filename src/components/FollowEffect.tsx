import React, { ReactNode, useEffect, useState } from 'react'
import { isMobileDevice } from '../Logic'

export interface IFollowEffect {
    active: boolean,
    children?: ReactNode
}

export function FollowEffect( props: IFollowEffect ) {

  const { active, children } = props

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onMobileEventDragStop = (event: any) => {
    const { clientX, clientY } = event.changedTouches[0]
    const element = document.elementFromPoint(clientX, clientY)
    const isClickable = element?.className.includes('clickable')
    console.log(element?.className)
    if (isClickable) {
      (element as any).click()
    }
  }

  useEffect(
    () => {
      const isMobile = isMobileDevice()
      
      const handleMouseMove = (event: PointerEvent) => {
        const { clientX, clientY } = event
        setPosition({ x: clientX, y: clientY })
      }
      
      const handleMobileMove = (event: TouchEvent) => {
        const { clientX, clientY } = event.touches[0]
        setPosition({ x: clientX, y: clientY })
      }

      if (isMobile) {
        console.log('is mobile')
        window.addEventListener('touchmove', handleMobileMove)
        window.addEventListener('touchend', onMobileEventDragStop)
      } else {
        window.addEventListener('pointermove', handleMouseMove)
      }

      return () => {
        if (isMobile) {
          window.removeEventListener('touchmove', handleMobileMove)
          window.removeEventListener('touchend', onMobileEventDragStop)
        } else {
          window.removeEventListener('pointermove', handleMouseMove)
        }
        setPosition({ x: 0, y: 0 })
      }
    }, []
  )

  useEffect(
    () => {
      document.body.classList.toggle('cursor-none', active)

      return () => {
        document.body.classList.remove('cursor-none')
      }
    }, [active]
  )

  if (!active) return <></>

  return (
    <div className='block absolute top-[-20px] left-[-20px] w-[40px] h-[40px] rounded-[50%] pointer-events-none text-4xl'
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  )

}