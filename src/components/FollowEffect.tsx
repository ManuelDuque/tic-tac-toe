import React, { ReactNode, useEffect } from 'react'
import { useFollowEffect } from '../hooks/useFollowEffect'

export function FollowEffect({ children }: { children: ReactNode }) {

  const { state, handleEvents, removeEvents } = useFollowEffect()

  useEffect(
    () => {
      handleEvents()

      return () => {
        removeEvents()
      }
    }, []
  )

  useEffect(
    () => {
      document.body.classList.toggle('cursor-none', state.followEffectActive)

      return () => {
        document.body.classList.remove('cursor-none')
      }
    }, [state.followEffectActive]
  )

  if (!state.followEffectActive) return <></>

  return (
    <div className='block absolute top-[-20px] left-[-20px] w-[40px] h-[40px] rounded-[50%] pointer-events-none text-4xl'
      style={{
        transform: `translate(${state.position.x}px, ${state.position.y}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  )

}