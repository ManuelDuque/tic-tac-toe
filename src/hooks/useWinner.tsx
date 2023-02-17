import { useContext, useEffect } from 'react'
import { WinnerContext } from '../contexts/WinnerContext'
import { Winner } from '../Logic'
import { useTurn } from './useTurn'

export interface WinnerContextProps {
    winner: Winner,
    setWinner: React.Dispatch<React.SetStateAction<Winner>>
}

export function useWinner(): WinnerContextProps {

  const winnerContext = useContext(WinnerContext) as WinnerContextProps
  const { winner, setWinner } = winnerContext as WinnerContextProps
    
  if (winner === undefined || setWinner === undefined) {
    throw new Error('useWinner must be used within a WinnerProvider')
  }

  const { turn } = useTurn()

  useEffect(() => {
    window.localStorage.setItem('winner', JSON.stringify(winner))

    return () => {
      window.localStorage.removeItem('winner')
    }
  }, [turn])
    
  return { winner, setWinner }

}