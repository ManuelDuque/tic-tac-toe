import React from 'react'
import { Turn } from '../Constants'
import { TurnContextProps } from '../hooks/useTurn'
import { Player } from '../Logic'

const loadInitialTurn = () : Player => {
  const turn = window.localStorage.getItem('turn')
  if (!turn) return Turn.X as Player
  return turn as Player
}

export const TurnContext = React.createContext<TurnContextProps>({} as TurnContextProps)

export function TurnProvider({ children }: { children: React.ReactNode }) {
        
  const [turn, setTurn] = React.useState<Turn>( loadInitialTurn() as Player )

  return (
    <TurnContext.Provider value={{ turn, setTurn }}>
      {children}
    </TurnContext.Provider>
  )
}