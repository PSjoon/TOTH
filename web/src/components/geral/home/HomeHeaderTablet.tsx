'use client'

import logo from '/public/iconsGeneral/logo.svg'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function HomeHeaderTablet() {
  return (
    <div className='w-full flex items-center justify-between z-50'>
      <Link href={'/'}>
        <Image
          src={logo}
          alt='Voltar a Página'
          className='w-[145px] ml-10'
          title='Página Inicial'
        />
      </Link>

      <div className='flex justify-center items-center gap-5 mr-10'>
        <Link href={'/'}>
          <div className='flex justify-center items-center border border-orange-500 bg-gray-200 rounded-md px-2 py-[2px]'>
            Mais Tarde
          </div>
        </Link>
        <Link href={'/logar'}>
          <div className='flex justify-center items-center bg-orange-500 rounded-md px-2 py-[2px]'>
            Logar
          </div>
        </Link>
        <Link href={'/cadastrar'}>
          <div className='flex justify-center items-center bg-orange-500 rounded-md px-2 py-[2px]'>
            Cadastrar
          </div>
        </Link>
      </div>
    </div>
  )
}
