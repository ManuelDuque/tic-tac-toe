import React, { createContext } from 'react'
import { useState } from 'react'
import { BoardContextProps } from '../hooks/useBoard'
import { BoardType } from '../Logic'

export const loadInitialBoard = () : Array<string | null> => {
  const board = window.localStorage.getItem('board')
  if (!board) return Array(9).fill(null) as BoardType
  return JSON.parse(board) as BoardType
}

export const BoardContext = createContext({} as BoardContextProps)

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {

  const [board, setBoard] = useState( loadInitialBoard() as BoardType )

  return (
    <BoardContext.Provider value={ { board, setBoard } }>
      {children}
    </BoardContext.Provider>
  )
}