'use client'

import lupaBlack from '/public/iconsGeneral/lupa-black.svg'
import lupa from '/public/iconsGeneral/lupa.svg'
import close from '/public/iconsGeneral/close.svg'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { button } from '@material-tailwind/react'
import Link from 'next/link'
import { getUserJS } from '@/lib/authGithub'

export function Search() {
  const [showInput, setShowInput] = useState(false)
  const [iconClick, setIconClick] = useState(false)
  const [searchBase, setSearchBase] = useState('')
  const router = useRouter()

  const clickshowInput = () => {
    setShowInput(!showInput)
  }

  const iconChange = () => {
    setIconClick(true)
  }

  const iconChangeFalse = () => {
    setIconClick(false)
  }

  const submitClick = () => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    console.log(urlParams.pathname)

    if (urlParams.pathname == '/pesquisa') {
      window.location.search = `search=${searchBase}`
    } else {
      router.push(`/pesquisa?search=${searchBase}`)
    }
  }

  const [message, setMessage] = useState('')

  const jwtInFo = getUserJS()

  useEffect(() => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const messageParam = urlParams.searchParams.get('error')
    if (messageParam) {
      setMessage(messageParam)

      const timeout = setTimeout(() => {
        setMessage('')
      }, 10000)
      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Transition
        show={showInput}
        enter='transition-all ease-in-out duration-500 delay-[200ms]'
        enterFrom='opacity-0 translate-x-2'
        enterTo='opacity-100 translate-y-0'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <div className='w-[22vw] h-8 flex ml-96 bg-gray-200 border-orange-500 items-center justify-end rounded-full'>
          <input
            type='text'
            name='search'
            className='h-full w-72 rounded-2xl border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
            onChange={(event) => setSearchBase(event.target.value)}
            placeholder='Buscar...'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/pesquisa?search=${searchBase}`)

                const currentURL = window.location.href
                const urlParams = new URL(currentURL)
                console.log(urlParams.pathname)
                if (urlParams.pathname == '/pesquisa') {
                  window.location.reload()
                }
              }
            }}
          />

          <Image
            src={lupa}
            alt='Pesquisar'
            onClick={submitClick}
            className='w-5 mr-2 ml-1 cursor-pointer transition-transform duration-300 transform hover:scale-110'
            title='Confirmar Pesquisa'
          />
        </div>
      </Transition>

      <div
        className='w-6 cursor-pointer transition-transform duration-300 transform hover:scale-110'
        onClick={clickshowInput}>
        {iconClick ? (
          <div>
            <Image
              src={close}
              alt='closeLupa'
              onClick={iconChangeFalse}
              title='Fechar'
              className='w-5'
            />
          </div>
        ) : (
          <div>
            <Image
              src={lupa}
              alt=''
              onClick={iconChange}
              title='Pesquisar'
              className='w-6'
            />
          </div>
        )}
      </div>
    </>
  )
}
