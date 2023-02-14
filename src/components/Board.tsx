import React from 'react'
import { Square } from './Square'

export function Board() {
  
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  
  return (
    <section className="grid grid-cols-3 gap-[10px]">
      {
        list.map((item, index) => {
          return (
            <Square
              key={index}
              id={index}
              onClick={() => console.log(`Clicked on ${index}`)}
              selected={false}
            >
              <div className='flex justify-center h-full items-center'>
                {item}
              </div>
            </Square>
          )
        })
      }
    </section>
  )

}