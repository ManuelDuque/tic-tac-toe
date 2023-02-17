import { useEffect, useReducer } from 'react'
import { isMobileDevice } from '../Logic'
import { followEffectReducer, FOLLOW_EFFECT_ACTIONS } from '../reducers/FollowEffect'
import { useWinner } from './useWinner'

interface IUseFollowEffect {
  state: {
    followEffectActive: boolean,
    position: { x: number, y: number }
  },
  handleEvents: () => void,
  removeEvents: () => void,
}

const onMobileEventDragStop = (event: any) => {
  const { clientX, clientY } = event.changedTouches[0]
  const element = document.elementFromPoint(clientX, clientY)
  const isClickable = element?.className.includes('clickable')
  if (isClickable) {
    (element as any).click()
  }
}

const initialState = { followEffectActive: true, position: { x: 0, y: 0 } }

export function useFollowEffect(): IUseFollowEffect {
  const [state, dispatch] = useReducer(followEffectReducer, initialState)

  const { winner } = useWinner()
  
  const setActive = () => dispatch({ type: FOLLOW_EFFECT_ACTIONS.ACTIVE })
  const setInactive = () => dispatch({ type: FOLLOW_EFFECT_ACTIONS.INACTIVE })
  const handlePosition = (event: any) => dispatch({ type: FOLLOW_EFFECT_ACTIONS.UPDATE_POSITION, payload: event })
  const reset = () => dispatch({ type: FOLLOW_EFFECT_ACTIONS.RESET })

  useEffect(
    () => {
      // Then the following effect is not active
      if (state.followEffectActive && winner !== null) {
        setInactive()
      }
      return () => {
        setActive()
      }
    }, [winner]
  )

  const handleEvents = () => {
    const isMobile = isMobileDevice()
    if (isMobile) {
      window.addEventListener('touchmove', handlePosition)
      window.addEventListener('touchend', onMobileEventDragStop)
    } else {
      window.addEventListener('pointermove', handlePosition)
    }
  }

  const removeEvents = () => {
    const isMobile = isMobileDevice()
    if (isMobile) {
      window.removeEventListener('touchmove', handlePosition)
      window.removeEventListener('touchend', onMobileEventDragStop)
    } else {
      window.removeEventListener('pointermove', handlePosition)
    }
    reset()
  }
  
  return { state, handleEvents, removeEvents }
}