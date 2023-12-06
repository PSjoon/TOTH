'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/iconsGeneral/logo.svg'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { text } from 'stream/consumers'
import { Retorno } from '@/components/geral/cadastroLogin/Retorno'

export default function Logar() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const messageParam = urlParams.searchParams.get('error')
    if (messageParam) {
      setMessage(messageParam)

      const timeout = setTimeout(() => {
        setMessage('')
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <div className='my-[12vh] fixed'>
      {message == 'userExisting' ? <Retorno /> : ''}
      <div className='mx-[22%] mb-10'>
        <Image src={logo} alt='' className='w-[250px]' />
      </div>
      <div className='bg-gray-400 rounded-2xl'>
        <p className='lg:w-[480px] md:w-[360px] text-white-200 leading-relaxed text-justify p-4 px-6'>
          Pariatur voluptate adipisicing est reprehenderit esse officia ullamco
          Lorem proident amet minim do aliquip. Et Lorem qui anim reprehenderit
          commodo magna officia aliqua quis ullamco. Fugiat cillum aute
          excepteur ex. Consectetur est sunt labore eiusmod sunt Lorem qui anim
          et qui ad. Reprehenderit nostrud elit occaecat officia nostrud laborum
          commodo occaecat duis. Do est veniam anim non do ex reprehenderit
          commodo irure sit eiusmod. Amet sit reprehenderit et consequat ad
          irure Lorem magna eiusmod velit. Sit aliqua id in dolore dolore Lorem
          tempor aliqua quis ipsum ea enim esse. In ullamco nisi esse excepteur
          magna laborum consequat fugiat sint est cillum. Cillum non laboris
          dolor anim reprehenderit nisi ut laboris commodo.
        </p>
      </div>
    </div>
  )
}
