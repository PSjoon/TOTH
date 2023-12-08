'use client'

import logo from '/public/iconsGeneral/logo.svg'
import iconComunity from '/public/iconsGeneral/comunity-on.svg'
import iconComunityHover from '/public/iconsGeneral/comunity.svg'
import iconCreate from '/public/iconsGeneral/create-on.svg'
import iconCreateHover from '/public/iconsGeneral/create.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Profile } from './profile/Profile'
import { Search } from '@/components/geral/header/Search'
import { useState } from 'react'

export function HeaderTablet() {
  const [hoveredComunity, setHoveredComunity] = useState(false)
  const [hoveredCreate, setHoveredCreate] = useState(false)

  return (
    <div className='w-full flex items-center justify-between'>
      <Link href={'/'}>
        <Image
          src={logo}
          alt='Voltar a Página'
          className='w-[145px] ml-10'
          title='Página Inicial'
        />
      </Link>

      <div className='flex justify-between items-center gap-[4vw]'>
        <Search />

        <Link href={'/artigo/criar'}>
          <div
            className='group'
            onMouseEnter={() => setHoveredCreate(true)}
            onMouseLeave={() => setHoveredCreate(false)}>
            <Image
              src={hoveredCreate ? iconCreate : iconCreateHover}
              alt='criarPostagem'
              className='w-6 cursor-pointer transition-transform duration-300 transform group-hover:scale-110'
              title='Criar Postagem'
            />
          </div>
        </Link>
        <Link href={'/comunidades/home'}>
          <div
            className='group'
            onMouseEnter={() => setHoveredComunity(true)}
            onMouseLeave={() => setHoveredComunity(false)}>
            <Image
              src={hoveredComunity ? iconComunity : iconComunityHover}
              alt='Criar Comunidade'
              className='w-6 cursor-pointer transition-transform duration-300 transform group-hover:scale-110'
              title='Criar Comunidades'
            />
          </div>
        </Link>

        <div className='flex justify-between items-center ml-4'>
          <Profile />
        </div>
      </div>
    </div>
  )
}
