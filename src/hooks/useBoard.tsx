import React, { useContext, useEffect } from 'react'
import { BoardContext } from '../contexts/BoardContext'
import { BoardType } from '../Logic'
import { useTurn } from './useTurn'

export interface BoardContextProps {
    board: BoardType,
    setBoard: React.Dispatch<React.SetStateAction<BoardType>>
}

export function useBoard(): BoardContextProps {
  
  const boardContext = useContext(BoardContext) as BoardContextProps
  const { board, setBoard } = boardContext as BoardContextProps

  if (board === undefined || setBoard === undefined) {
    throw new Error('useBoard must be used within a BoardProvider')
  }

  const { turn } = useTurn()

  useEffect(
    () => {
      window.localStorage.setItem('board', JSON.stringify(board))
      return () => {
        window.localStorage.removeItem('board')
      }
    }, [turn]
  )

  return { board, setBoard }
}