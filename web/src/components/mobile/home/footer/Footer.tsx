'use client'

import iconCreate from '/public/iconsGeneral/create-on.svg'
import lupaBlack from '/public/iconsGeneral/lupa-black.svg'
import iconComunity from '/public/iconsGeneral/comunity-on.svg'
import lupa from '/public/iconsGeneral/lupa.svg'
import { Transition } from '@headlessui/react'

import Image from 'next/image'
import Link from 'next/link'
import homeIcon from '/public/iconsFooter/icon-home.svg'
import { SearchTop } from './SearchTop'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Profile } from '@/components/computer/home/header/profile/Profile'
import { getUserJS } from '@/lib/authGithub'
import { ProfilePicture } from '@/components/computer/home/header/profile/ProfilePicture'
import { ProfilePictureOn } from '@/components/computer/home/header/profile/ProfilePictureOn'
import { ProfilePictureOnMobile } from '@/components/computer/home/header/profile/ProfilePictureOnMobile'
import { SearchMobile } from './SearchMobile'

export function Footer() {
  const [isVisible, setVisible] = useState(false)
  const [isLogged, setIsLogged] = useState('')
  const jwtInFo = getUserJS()

  const clickVisible = () => {
    setVisible(!isVisible)
  }

  useEffect(() => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      setIsLogged(sub)
    }
  }, [])

  return (
    <footer className='fixed bottom-0 left-0 right-0'>
      <Transition
        show={isVisible}
        enter='transition-all ease-in-out duration-500 delay-[150ms]'
        enterFrom='opacity-0 translate-y-6'
        enterTo='opacity-100 translate-y-0'
        leave='transition-all ease-in-out duration-500'
        leaveFrom='opacity-100 translate-y-6'
        leaveTo='opacity-0'>
        <div className='w-full h-[40vh] bg-gray-900 opacity-90 overflow-y-auto grid grid-cols-1 place-items-center items-center justify-between'>
          <SearchMobile />

          <div className='w-[23vw] h-0.5 border-t-2 my-2 border-white-200' />

          <p className='text-orange-500 mt-2 text-lg italic'>
            Posts Mais Vistos
          </p>

          <div className='w-[90%]'>
            <SearchTop />
          </div>
        </div>
      </Transition>

      <div className='w-full h-[10vh] items-center justify-between inline-flex p-5 bg-gray-800 border-b-[3px] border-orange-500'>
        <div className='w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full '>
          <Link href={'/'} className='mt-[-1px]'>
            <Image
              src={homeIcon}
              alt='home_icon'
              width={30}
              height={30}
              className='cursor-pointer'
            />
          </Link>
        </div>
        <div
          className='w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full cursor-pointer'
          onClick={clickVisible}>
          <div>
            <Image src={lupa} alt='search_icon' width={30} height={30} />
          </div>
        </div>
        <div className='w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full hover:bg-gray-900'>
          <Link href={'/artigo/criar'} className='mt-[-1px]'>
            <Image src={iconCreate} alt='create_icon' width={30} height={30} />
          </Link>
        </div>
        <div className='w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full hover:bg-gray-900'>
          <Link href={'/comunidades/home'} className='mt-[-1px]'>
            <Image
              src={iconComunity}
              alt='comuni_icon'
              width={28}
              height={28}
            />
          </Link>
        </div>

        {isLogged ? <ProfilePictureOnMobile /> : <ProfilePicture />}
      </div>
    </footer>
  )
}
