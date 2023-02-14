import React, { ReactNode } from 'react'

interface SquareProps {
    id?: number | undefined,
    onClick?: (index: number) => void | undefined,
    selected?: boolean | undefined,
    children?: ReactNode | undefined,
    className?: string | undefined
}

export function Square( props : SquareProps ) {
  
  const { id, onClick, selected, children, className } = props

  let squareClassName = 'w-[100px] h-[100px] border-2 border-gray-300 rounded-md place-items-center text-4xl'
  if (selected !== undefined && selected) {
    squareClassName += ' text-gray-50 bg-blue-500'
  }

  if (className !== undefined) {
    squareClassName += ` ${className}`
  }

  return (
    <div
      className={squareClassName}
      onClick={
        () => {
          if (id !== undefined && onClick !== undefined) {
            onClick(id)
          }
        }
      }
    >
      <div className='flex justify-center h-full items-center'>
        {children}
      </div>
    </div>
  )

}