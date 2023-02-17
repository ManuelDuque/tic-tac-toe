import { isWinner, nextTurn, updateBoard } from '../Logic'
import { useBoard } from './useBoard'
import { useTurn } from './useTurn'
import { useWinner } from './useWinner'

export function useHandleSquareClick() {
  
  const { board, setBoard } = useBoard()
  const { turn, setTurn } = useTurn()
  const { winner, setWinner } = useWinner()

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return
    // Update the board
    const newBoard = updateBoard(board, index, turn)
    setBoard(newBoard)
    // Check if there is a winner
    const newWinner = isWinner(newBoard, turn)
    if (newWinner !== null) {
      setWinner(newWinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
    // Update the turn
    const newTurn = nextTurn(turn)
    setTurn(newTurn)
  }

  return { handleSquareClick }
}