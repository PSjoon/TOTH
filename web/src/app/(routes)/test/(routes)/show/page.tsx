'use client'

import React, { useState } from 'react'
import Componente1 from './Componente1'
import Componente2 from './Componente2'
import Componente3 from './Componente3'

const App: React.FC = () => {
  const [componenteAtivo, setComponenteAtivo] = useState<number | null>(null)

  const handleClick = (numeroComponente: number) => {
    setComponenteAtivo(numeroComponente)
  }

  return (
    <div>
      <div>
        <button onClick={() => handleClick(1)}>Ícone 1</button>
        <button onClick={() => handleClick(2)}>Ícone 2</button>
        <button onClick={() => handleClick(3)}>Ícone 3</button>
      </div>
      <div>
        {componenteAtivo === 1 && <Componente1 />}
        {componenteAtivo === 2 && <Componente2 />}
        {componenteAtivo === 3 && <Componente3 />}
      </div>
    </div>
  )
}

export default App
