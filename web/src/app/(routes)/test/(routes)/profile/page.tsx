'use client'

import React, { useState } from 'react'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className={`text-lg ${isOpen ? 'text-red-500' : 'text-black'}`}
        onClick={toggleMenu}>
        Toggle Menu
      </div>

      {isOpen && (
        <div className='grid grid-cols-1'>
          {/* Seu conteúdo de menu aqui */}
          <a href='#' className=''>
            Item 1
          </a>
          <a href='#' className=''>
            Item 2
          </a>
          <a href='#' className=''>
            Item 3
          </a>
        </div>
      )}
    </div>
  )
}

export default App
