import React, { createContext, useEffect, useState } from 'react'
import { Turn } from '../Constants'
import { BoardType, Player, Winner } from '../Logic'
import { Board } from './Board'
import { FollowEffect } from './FollowEffect'
import { TurnInfo } from './TurnInfo'
import { WinnerModal } from './WinnerModal'

export interface IGameContext {
  board: Array<string | null>,
  setBoard: React.Dispatch<React.SetStateAction<Array<string | null>>>,
  turn: Turn,
  setTurn: React.Dispatch<React.SetStateAction<Turn>>,
  winner: Winner,
  setWinner: React.Dispatch<React.SetStateAction<Winner>>
}

export const GameContext = createContext<IGameContext>({} as IGameContext)

const loadInitialBoard = () : Array<string | null> => {
  const board = window.localStorage.getItem('board')
  if (!board) return Array(9).fill(null) as BoardType
  return JSON.parse(board) as BoardType
}

const loadInitialTurn = () : Player => {
  const turn = window.localStorage.getItem('turn')
  if (!turn) return Turn.X as Player
  return turn as Player
}

const loadInitialWinner = () : Winner => {
  const winner = window.localStorage.getItem('winner')
  if (winner === 'undefined' || winner === undefined) return undefined
  if (winner === 'null' || winner === null) return null
  return JSON.parse(winner) as Winner
}

export function Game() {
  
  const [board, setBoard] = useState( loadInitialBoard() as BoardType )
  const [turn, setTurn] = useState( loadInitialTurn() as Player )
  const [winner, setWinner] = useState( loadInitialWinner() as Winner )
  const [followEffectActive, setFollowEffectActive] = useState(false)

  useEffect(
    () => {
      // When turn changes, save the new state of the turn, board and winner
      window.localStorage.setItem('board', JSON.stringify(board))
      window.localStorage.setItem('turn', turn)
      window.localStorage.setItem('winner', JSON.stringify(winner))
      return () => {
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
        window.localStorage.removeItem('winner')
      }
    }, [turn]
  )

  useEffect(
    () => {
      // Then the following effect is not active
      if (winner !== undefined) {
        setFollowEffectActive(false)
      }
      return () => {
        setFollowEffectActive(true)
      }
    }, [winner]
  )

  const reset = () => {
    setBoard(Array(9).fill(null) as BoardType)
    setTurn(Turn.X as Player)
    setWinner(undefined)
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('winner')
  }

  return (
    <GameContext.Provider value={{ board, setBoard, turn, setTurn, winner, setWinner }}>
      <main className='w-fit mx-[40px] my-auto text-center'>
        
        <Board />
        
        <TurnInfo turn={turn} />

        <WinnerModal>
          <button className='text-xl py-[8px] px-[12px] m-[25px] bg-transparent
            border-2 border-solid border-[#eee] text-[#eee] max-w-[200px]
            rounded-[5px] font-bold cursor-pointer transition-colors duration-0.2 hover:bg-[#eee] hover:text-[#222]'
          onClick={
            () => {
              reset()
            }
          }
          >
            Reiniciar
          </button>
        </WinnerModal>

        <FollowEffect
          active={followEffectActive}
          onMobileEventDragStop={
            () => {
              console.log('onMobileEventDragStop')
            }
          }>
          {turn}
        </FollowEffect>

      </main>
    </GameContext.Provider>
  )
}