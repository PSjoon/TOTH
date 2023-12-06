'use client'

import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ChevronDown } from 'lucide-react'
import { CommunityAbbrev } from '@/components/geral/comunidades/abbreviation/CommunityAbbrev'

export default function Criar() {
  const [isVisible, setVisible] = useState(false)

  const clickVisible = () => {
    setVisible(!isVisible)
  }

  return (
    <div>
      {/* <div
        onClick={clickVisible}
        className='w-[93%] h-10 ml-2 p-4 mb-2 flex items-center justify-between text-left bg-gray-800 rounded-3xl text-orange-500'>
        <p className='ml-1'>Veja Outros Posts</p>
        <ChevronDown className='w-8 h-8 ml-16' />
      </div>
      <CSSTransition in={isVisible} timeout={100} unmountOnExit>
        <div className='w-[93%] ml-2 p-4 rounded-3xl bg-gray-800 text-white-200 opacity-90'>
          <div className='grid gap-6 grid-cols-1 place-items-center overflow-hidden'>
            <PostLeft />
            <PostLeft />
            <PostLeft />
            <PostLeft />
            <PostLeft />
            <PostLeft />
            <PostLeft />
          </div>
        </div>
      </CSSTransition> */}
    </div>
  )
}
