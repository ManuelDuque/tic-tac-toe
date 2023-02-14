import { Turn, WinningCombination } from './Constants'

export type Player = Turn.X | Turn.O;
export type BoardType = Array<string | null>
export type Winner = Player | null | undefined

export function isWinner(board: BoardType, player: Player) : Winner {
  const winningCombination = WinningCombination.find(
    (combination) => {
      return board[combination[0]] === player && board[combination[1]] === player && board[combination[2]] === player
    }
  )
  return winningCombination ? player : undefined
}

export function nextTurn(turn: Player) : Player {
  return turn === Turn.X ? Turn.O : Turn.X
}

export function updateBoard(board: BoardType, index: number, turn: Player) : BoardType {
  const newBoard = [...board]
  newBoard[index] = turn
  return newBoard
}