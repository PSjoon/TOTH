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

export function SearchMobile() {
  const [searchBase, setSearchBase] = useState('')
  const router = useRouter()

  const submitClick = () => {
    router.push(`/pesquisa?search=${searchBase}`)

    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    console.log(urlParams.pathname)
    if (urlParams.pathname == '/pesquisa') {
      window.location.reload()
    }
  }

  return (
    <div className='w-[38vw] h-8 flex ml-8  border-orange-500 items-center justify-end rounded-full'>
      <input
        type='text'
        name='search'
        className='h-full w-72 rounded-2xl border-orange-500 px-3 py-3 font-sans text-sm font-normal text-black outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
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
  )
}
