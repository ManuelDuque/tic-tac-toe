import React from 'react'
import { Turn } from '../Constants'
import { Square } from './Square'

export interface ITurnInfoProps {
    turn: string
}

export function TurnInfo( props : ITurnInfoProps ) {
  const { turn } = props
    
  const squareClassName = 'w-[70px] h-[70px] border-transparent'

  return (
    <section className='flex relative mt-5 justify-center'>
      <Square selected={ turn === Turn.X } className={squareClassName}> {Turn.X} </Square>
      <Square selected={ turn === Turn.O } className={squareClassName}> {Turn.O} </Square>
    </section>
  )
}