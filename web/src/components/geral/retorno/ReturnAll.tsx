import React, { useState, useEffect } from 'react'

export function ReturnAll(message: any) {
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false)

  useEffect(() => {
    if (message.message === 'Copiado') {
      setCopiedMessageVisible(true)

      const timeout = setTimeout(() => {
        setCopiedMessageVisible(false)
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [message.message])

  if (copiedMessageVisible) {
    return (
      <div className='absolute -ml-12 -mt-8 text-orange-500 bg-gray-300 opacity-80 rounded-r-3xl rounded-l-lg p-2 pl-4 z-50'>
        <div className='flex'>Artigo Copiado</div>
      </div>
    )
  }

  if (message.message === 'userLogged') {
    return (
      <div className='absolute -ml-12 -mt-8 text-orange-500 bg-gray-300 opacity-80 rounded-r-3xl rounded-l-lg p-2 pl-4 z-50'>
        <div className='flex'>Usuário já Logado</div>
      </div>
    )
  }
}
