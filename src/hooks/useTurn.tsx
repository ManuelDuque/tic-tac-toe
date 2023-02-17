import { useContext, useEffect } from 'react'
import { Turn } from '../Constants'
import { TurnContext } from '../contexts/TurnContext'

export interface TurnContextProps {
    turn: Turn,
    setTurn: React.Dispatch<React.SetStateAction<Turn>>
}

export function useTurn(): TurnContextProps {

  const turnContext = useContext(TurnContext) as TurnContextProps
  const { turn, setTurn } = turnContext as TurnContextProps
    
  if (turn === undefined || setTurn === undefined) {
    throw new Error('useTurn must be used within a TurnProvider')
  }

  useEffect(
    () => {
      window.localStorage.setItem('turn', turn)
      return () => {
        window.localStorage.removeItem('turn')
      }
    }, [turn]
  )
  
  return { turn, setTurn }
}