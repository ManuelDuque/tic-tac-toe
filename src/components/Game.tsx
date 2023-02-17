import React from 'react'
import { useReset } from '../hooks/useReset'
import { useTurn } from '../hooks/useTurn'
import { Board } from './Board'
import { FollowEffect } from './FollowEffect'
import { TurnInfo } from './TurnInfo'
import { WinnerModal } from './WinnerModal'

export function Game() {
  
  const { turn } = useTurn()
  const { resetBoard } = useReset()

  return (
    <main className='w-fit mx-[40px] my-auto text-center'>
        
      <Board />
        
      <TurnInfo turn={turn} />

      <WinnerModal>
        <button className='text-xl py-[8px] px-[12px] m-[25px] bg-transparent
            border-2 border-solid border-[#eee] text-[#eee] max-w-[200px]
            rounded-[5px] font-bold cursor-pointer transition-colors duration-0.2 hover:bg-[#eee] hover:text-[#222]'
        onClick={
          () => {
            resetBoard()
          }
        }
        >
            Reiniciar
        </button>
      </WinnerModal>

      <FollowEffect>
        {turn}
      </FollowEffect>

    </main>
  )
}