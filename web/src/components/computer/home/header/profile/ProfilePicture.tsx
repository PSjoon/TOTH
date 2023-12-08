import User from '/public/iconsGeneral/User2.svg'
import Image from 'next/image'
import Link from 'next/link'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { getUserJS } from '@/lib/authGithub'
import { useEffect, useState } from 'react'

export function ProfilePicture() {
  return (
    <>
      <Link href='/cadastrar?error=UserLoggedRequire'>
        <Image
          src={User}
          alt='Não Logado'
          className='w-11 h-11 rounded-full border shadow-2xl cursor-pointer'
          title='Página Cadastro'
        />
      </Link>
    </>
  )
}
