'use client'

import { useEffect, useState } from 'react'
import { Bookmark, FilesIcon, PlusCircle, CircleEllipsis } from 'lucide-react'
import Comuny from 'public/iconsFooter/icon-comu.svg'
import Image from 'next/image'
import { getUserJS } from '@/lib/authGithub'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { fetchData } from 'next-auth/client/_utils'
import { Transition } from '@headlessui/react'
import { ProfileComuni } from '../../profile/ProfileComuni'
import { SavePost } from '../../profile/SavePost'
import { UserPost } from '../../user/UserPost'
import { Options } from './Options'

export function OptionsCommunity() {
  const [isVisible, setVisible] = useState(false)
  const [pointiconColor, setpointIconColor] = useState('#EFEFEF')

  const clickVisible = () => {
    setVisible(!isVisible)
    setpointIconColor(pointiconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
  }

  return (
    <>
      <div className='flex -mt-0.5 -ml-2.5 justify-between items-center'>
        <span title='Opções'>
          <CircleEllipsis
            className='w-[26px] h-[26px] md:w-[28px] md:h-[28px] cursor-pointer'
            onClick={clickVisible}
            color={pointiconColor}
          />
        </span>
      </div>

      <Transition
        show={isVisible}
        enter='transition-all ease-in-out duration-500 delay-[150ms]'
        enterFrom='opacity-0 -translate-y-6'
        enterTo='opacity-100 translate-y-0'
        leave='transition-all ease-in-out duration-500'
        leaveFrom='opacity-100 -translate-y-6'
        leaveTo='opacity-0'>
        <div className='mx-2 mt-5 md:mx-6 border-x-[1px] border-y-[1px] border-orange-500 rounded-3xl bg-gray-300 '>
          <Options />
        </div>
      </Transition>
    </>
  )
}
