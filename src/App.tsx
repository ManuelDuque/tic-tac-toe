import React from 'react'
import { Game } from './components/Game'
import { BoardProvider } from './contexts/BoardContext'
import { TurnProvider } from './contexts/TurnContext'
import { WinnerProvider } from './contexts/WinnerContext'

function App() {
  return (
    <BoardProvider>
      <TurnProvider>
        <WinnerProvider>
          <div className='min-h-screen bg-[#242424] flex items-center justify-center'>
            <Game />
          </div>
        </WinnerProvider>
      </TurnProvider>
    </BoardProvider>
  )
}

export default App
