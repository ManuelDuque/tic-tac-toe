import React, { useContext, useEffect } from 'react'
import { Square } from './Square'
import { GameContext, IGameContext } from './Game'
import { isWinner, nextTurn, updateBoard } from '../Logic'

export function Board() {
  
  const gameContext = useContext(GameContext) as IGameContext
  const { board, setBoard, turn, setTurn, winner, setWinner } = gameContext

  const onBoardSquareClick = (index: number) => {
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
  
  return (
    <section className="grid grid-cols-3 gap-[10px]">
      {
        board.map((item, index) => {
          return (
            <Square
              key={index}
              id={index}
              onClick={ onBoardSquareClick }
              selected={false}
            >
              {item}
            </Square>
          )
        })
      }
    </section>
  )

}