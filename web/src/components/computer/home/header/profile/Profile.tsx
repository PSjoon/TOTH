'use client'

import { useEffect, useState } from 'react'
import { Options } from '../Options'
import { ProfilePicture } from './ProfilePicture'
import Cookies from 'js-cookie'
import { ProfilePictureOn } from './ProfilePictureOn'
import { Transition } from '@headlessui/react'
import { getUserJS } from '@/lib/authGithub'

export function Profile() {
  const [isVisible, setVisible] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const jwtInFo = getUserJS()

  const clickVisible = () => {
    setVisible(!isVisible)
  }

  useEffect(() => {
    if (jwtInFo) {
      setIsLogged(true)
    }
  }, [])

  return (
    <>
      <div className='w-11 h-11 mr-4' onClick={clickVisible}>
        {isLogged ? <ProfilePictureOn /> : <ProfilePicture />}

        <Transition
          show={isVisible}
          enter='transition-all ease-in-out duration-500 delay-[200ms]'
          enterFrom='opacity-0 translate-x-2'
          enterTo='opacity-100 translate-y-0'
          leave='transition-all ease-in-out duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed right-1 top-4'>
            <Options />
          </div>
        </Transition>
      </div>
    </>
  )
}
