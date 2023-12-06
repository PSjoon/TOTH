import { getUserJS } from '@/lib/authGithub'
import Image from 'next/image'
import { ProfilePicture } from './ProfilePicture'
import Link from 'next/link'
import { useState } from 'react'

export function ProfilePictureOnMobile() {
  const jwtInFo = getUserJS()

  if (jwtInFo) {
    const { profilePictures } = jwtInFo
    const { sub } = jwtInFo

    if (profilePictures) {
      return (
        <Link href={`/perfil/${sub}`}>
          <Image
            src={profilePictures}
            alt='userLogado'
            width={500}
            height={500}
            className='w-11 h-11 rounded-full border shadow-2xl cursor-pointer'
            title='Opções de Usuário'
          />
        </Link>
      )
    }
  }
  return <ProfilePicture />
}
