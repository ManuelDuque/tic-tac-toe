import React, { ReactNode } from 'react'

interface SquareProps {
    id: number,
    onClick: (index: number) => void,
    selected: boolean,
    children?: ReactNode
}

export function Square( props : SquareProps ) {
  
  const { id, onClick, selected, children } = props

  let className = 'w-[100px] h-[100px] border-2 border-gray-300 rounded-md place-items-center text-4xl cursor-pointer'
  if (selected !== undefined && selected) {
    className += ' text-gray-50 bg-blue-500'
  }

  return (
    <div
      className={className}
      onClick={() => onClick(id)}
    >
      {children}
    </div>
  )

}