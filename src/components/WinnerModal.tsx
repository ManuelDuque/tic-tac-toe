import React from 'react'
import { Turn } from '../Constants'
import { Square } from './Square'
import confetti from 'canvas-confetti'
import { useWinner } from '../hooks/useWinner'

export interface IWinnerModalProps {
    children?: React.ReactNode | undefined
}

export function WinnerModal( props: IWinnerModalProps ) {
  
  const { winner } = useWinner()

  const { children } = props

  if (winner === undefined || winner === null) return (<></>)
  
  let winnerText = ''
  if (winner === false) {
    winnerText = 'Empate!'
  } else {
    winnerText = `Ganador: ${winner}!`
  }
 
  confetti()
 
  return (
    <section className='absolute w-full h-full top-0 left-0 grid place-items-center bg-[rgba(0, 0, 0, 0.7)]'>
      <div className='min-w-[300px] min-h-[320px] bg-[#111] border-2 border-solid border-[#eee] rounded-[10px] flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-gray-50 mb-[16px] pointer-events-none text-2xl mt-8'>{winnerText}</h1>

        <header className='my-0 mx-auto w-fit border-2 border-solid border-[#eee] rounded-[10px] flex gap-[15px]'>
          {
            (winner === false) ? (
              <div className='flex justify-center items-center gap-[10px] p-2'>
                <Square className='pointer-events-none'>{Turn.X}</Square>
                <Square className='pointer-events-none'>{Turn.O}</Square>
              </div>
            ) : (
              <Square className='pointer-events-none'>{winner}</Square>
            )
          }
        </header>

        <footer className='flex justify-around items-center'>
          {children}
        </footer>
      </div>
    </section>
  )
}