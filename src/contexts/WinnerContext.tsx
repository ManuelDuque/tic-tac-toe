import React, { useState } from 'react'
import { WinnerContextProps } from '../hooks/useWinner'
import { Winner } from '../Logic'

const loadInitialWinner = () : Winner => {
  const winner = window.localStorage.getItem('winner') as string | null
  if (!winner) return null
  return JSON.parse(winner) as Winner
}

export const WinnerContext = React.createContext({} as WinnerContextProps)

export function WinnerProvider({ children }: { children: React.ReactNode }) {
          
  const [winner, setWinner] = useState( loadInitialWinner() as Winner )
    
  return (
    <WinnerContext.Provider value={{ winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  )
}