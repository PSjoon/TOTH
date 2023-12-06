'use client'

import { MoreVertical } from 'lucide-react'
import { Transition } from '@headlessui/react'
import { ShowOptions } from './ShowOptions'
import { useState } from 'react'
import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'

export function JustMoreVertical(artigo: any) {
  const [pointiconColor, setpointIconColor] = useState('#EFEFEF')
  const [pointfillIcon, setpointfillIcon] = useState('#EFEFEF')
  const [isVisible, setVisible] = useState(false)
  const [IsFollow, setIsFollow] = useState(false)
  const [Return, setReturn] = useState('')
  const jwtInFo = getUserJS()

  const clickVisible = () => {
    setVisible(!isVisible)
    setpointIconColor(pointiconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
    setpointfillIcon(pointfillIcon === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
  }

  return (
    <div className='flex mr-2'>
      <span title='Opções de Postagem'>
        <MoreVertical
          onClick={clickVisible}
          size={32}
          color={pointiconColor}
          fill={pointfillIcon}
          className='md:w-[34px] md:h-[34px] ml-2 cursor-pointer'
        />
      </span>
      <Transition
        show={isVisible}
        enter='transition-all ease-in-out duration-500 delay-[200ms]'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <ShowOptions artigoId={artigo.artigo} />
      </Transition>
    </div>
  )
}
