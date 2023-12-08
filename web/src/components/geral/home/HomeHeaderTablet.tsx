'use client'

import logo from '/public/iconsGeneral/logo.svg'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function HomeHeaderTablet() {
  return (
    <div className='w-full flex items-center justify-between z-50'>
      <Image
        src={logo}
        alt='Logo TOTH'
        className='w-[145px] ml-10'
        title='Logo TOTH'
      />

      <div className='flex justify-center items-center gap-5 mr-10'>
        <Link href={'/'}>
          <div
            className='flex justify-center items-center border border-orange-500 bg-gray-200 rounded-md px-2 py-[2px]'
            title='Acessar TOTH'>
            Mais Tarde
          </div>
        </Link>
        <Link href={'/logar'}>
          <div
            className='flex justify-center items-center bg-orange-500 rounded-md px-2 py-[2px]'
            title='Logue-se'>
            Logar
          </div>
        </Link>
        <Link href={'/cadastrar'}>
          <div
            className='flex justify-center items-center bg-orange-500 rounded-md px-2 py-[2px]'
            title='Cadastre-se'>
            Cadastrar
          </div>
        </Link>
      </div>
    </div>
  )
}
