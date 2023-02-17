import { Turn } from '../Constants'
import { BoardType, Player } from '../Logic'
import { useBoard } from './useBoard'
import { useTurn } from './useTurn'
import { useWinner } from './useWinner'

export function useReset(): { resetBoard: () => void } {
  const { setBoard } = useBoard()
  const { setTurn } = useTurn()
  const { setWinner } = useWinner()

  const resetBoard = () => {
    setBoard(Array(9).fill(null) as BoardType)
    setTurn(Turn.X as Player)
    setWinner(null)
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('winner')
  }

  return { resetBoard }
}