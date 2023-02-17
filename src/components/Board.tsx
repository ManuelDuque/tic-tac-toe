import React from 'react'
import { Square } from './Square'
import { useBoard } from '../hooks/useBoard'
import { useHandleSquareClick } from '../hooks/useHandleSquareClick'

export function Board() {
  
  const { board } = useBoard()
  const { handleSquareClick } = useHandleSquareClick()
  
  return (
    <section className="grid grid-cols-3 gap-[10px]">
      {
        board.map((item, index) => {
          return (
            <Square
              key={index}
              id={index}
              onClick={ () => handleSquareClick(index) }
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