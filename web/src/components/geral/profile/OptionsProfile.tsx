'use client'

import { useEffect, useState } from 'react'
import { Options } from './Options'
import { Bookmark, FilesIcon, PlusCircle, CircleEllipsis } from 'lucide-react'
import Comuny from 'public/iconsFooter/icon-comu.svg'
import Image from 'next/image'
import { ProfileComuni } from './ProfileComuni'
import { SavePost } from './SavePost'
import { Transition } from '@headlessui/react'
import { UserPost } from '../user/UserPost'
import { AnimationRedes } from './AnimationRedes'
import { getUserJS } from '@/lib/authGithub'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import { fetchData } from 'next-auth/client/_utils'

export function OptionsProfile() {
  const [iconColor, setIconColor] = useState('#EFEFEF')
  const [isVisible, setVisible] = useState(false)
  const [pointiconColor, setpointIconColor] = useState('#EFEFEF')

  const { by } = useParams()
  const jwtInFo = getUserJS()

  const getfollow = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo

      const userFollows = await api.post(`perfil/follow/${sub}`)

      if (userFollows.data.includes(by)) {
        setIconColor(iconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
      }
    }
  }

  useEffect(() => {
    getfollow()
  }, [])

  const handleIconClick = async () => {
    setIconColor(iconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')

    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.post(`/perfil/${sub}`, {
        user: by,
      })
    }
  }

  const clickVisible = () => {
    setVisible(!isVisible)
    setpointIconColor(pointiconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
  }

  const [componenteAtivo, setComponenteAtivo] = useState<number | null>(1)

  const handleClick = (numeroComponente: number) => {
    setComponenteAtivo(numeroComponente)
  }

  const isLog = () => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      if (by == sub) {
        return true
      }
    }
  }

  const isUser = () => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      if (by != sub) {
        return true
      }
    }
  }

  return (
    <>
      <div className='border-b-[1px] border-orange-500 rounded-b-2xl md:mx-6 mx-2 '>
        <div className='float-right flex flex-col lg:mr-[98px] mr-2 -mt-[100px] md:-mt-[150px] gap-2 justify-between items-center'>
          {isLog() && (
            <span title='Opções'>
              <CircleEllipsis
                className='w-[26px] h-[26px] md:w-[28px] md:h-[28px] cursor-pointer'
                onClick={clickVisible}
                color={pointiconColor}
              />
            </span>
          )}
          {isUser() && (
            <div title='Seguir Usuário'>
              <PlusCircle
                className='w-[26px] h-[26px] md:w-[28px] md:h-[28px] cursor-pointer'
                onClick={handleIconClick}
                color={iconColor}
              />
            </div>
          )}
        </div>

        <div className='w-full my-2 md:mt-8 flex justify-between items-center place-items-center '>
          <div
            className='w-full flex justify-center items-center border-r-2 border-solid border-white-200'
            title='Postagens do Usuário'>
            <div
              className='px-20 py-1 rounded-xl hover:bg-gray-200 transition-all ease-in-out duration-300 delay-[150ms] cursor-pointer'
              onClick={() => handleClick(1)}>
              <FilesIcon className='w-7 h-7 md:w-8 md:h-8' />
            </div>
          </div>
          <div
            className='w-full flex justify-center items-center'
            title='Comunidades Pertencentes'>
            <div
              className='px-20 py-1 rounded-xl hover:bg-gray-200 transition-all ease-in-out duration-300 delay-[150ms] cursor-pointer'
              onClick={() => handleClick(2)}>
              <Image
                src={Comuny}
                alt='Comunidades_icon'
                className='w-7 h-7 md:w-[30px] md:h-[30px]'
              />
            </div>
          </div>
          <div
            className='w-full justify-center items-center border-l-2 border-solid border-white-200 hidden lg:flex '
            title='Posts Salvos'>
            <div
              className='px-20 py-1 rounded-xl hover:bg-gray-200 transition-all ease-in-out duration-300 delay-[150ms] cursor-pointer'
              onClick={() => handleClick(3)}>
              <Bookmark
                size={30}
                color={'#F56B07'}
                className=' w-8 h-8 fill-orange-500'
              />
            </div>
          </div>
        </div>
      </div>

      <Transition
        show={isVisible}
        enter='transition-all ease-in-out duration-500 delay-[150ms]'
        enterFrom='opacity-0 -translate-y-6'
        enterTo='opacity-100 translate-y-0'
        leave='transition-all ease-in-out duration-500'
        leaveFrom='opacity-100 -translate-y-6'
        leaveTo='opacity-0'>
        <div className='mx-2 lg:mx-28 mt-5 lg:ml-[133px] md:mx-6 border-x-[1px] border-y-[1px] border-orange-500 rounded-3xl bg-gray-300 '>
          <Options />
        </div>
      </Transition>

      <div className=''>
        {componenteAtivo === 1 && (
          <div className='md:mx-4 lg:ml-10 mb-32 lg:mb-0'>
            <UserPost />
          </div>
        )}

        {componenteAtivo === 2 && (
          <div className='grid my-24 mx-2 py-6 md:mx-6 lg:mx-28 mt-5 lg:ml-[133px] gap-6 grid-cols-1 place-items-center border-y-[1px] border-orange-500 rounded-3xl bg-gray-200'>
            <ProfileComuni />
          </div>
        )}
        {componenteAtivo === 3 && (
          <div className='md:mx-4 lg:ml-10 mb-32 lg:mb-0'>
            <SavePost />
          </div>
        )}
      </div>
    </>
  )
}
