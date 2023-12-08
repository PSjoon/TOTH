'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/iconsGeneral/logo.svg'
import { useState, useEffect } from 'react'
import { Retorno } from '@/components/geral/cadastroLogin/Retorno'
import { getUserJS } from '@/lib/authGithub'
import { useRouter } from 'next/navigation'

export default function Cadastro() {
  const [message, setMessage] = useState('')

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

  const routes = useRouter()

  const jwtInFo = getUserJS()

  if (jwtInFo) {
    routes.push('/?error=userLogged')
  }

  return (
    <div className='my-[12vh] fixed'>
      {message == 'userNotExisting' ? <Retorno /> : ''}
      {message == 'UserLoggedRequire' ? <Retorno /> : ''}
      <div className='mx-[22%] mb-10'>
        <Image src={logo} alt='' className='w-[250px]' />
      </div>
      <div className='bg-gray-400 rounded-2xl'>
        <p className='lg:w-[480px] md:w-[360px] text-white-200 leading-relaxed text-justify p-4 px-6'>
          A produção científica e os debates acadêmicos são tradicionalmente
          vistos como atividades sérias e complexas0, restritas a um público
          específico e distante do cotidiano da maioria das pessoas. No entanto,
          a disseminação do conhecimento científico e o acesso à informação são
          cada vez mais essenciais para a sociedade atual. Com o intuito de
          romper com essa visão restritiva e promover a democratização do
          conhecimento, surge então a plataforma Toth.
        </p>
      </div>
    </div>
  )
}
