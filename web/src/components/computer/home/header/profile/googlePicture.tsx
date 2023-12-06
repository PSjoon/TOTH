import { api } from '@/lib/api'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export function GooglePicture() {
  const { data: session } = useSession()

  if (session) {
    const userPictures = session?.user?.image

    // console.log(userPictures)
    // console.log(userEmail)
    // console.log(typeof userName)
    // console.log(userName)

    if (userPictures) {
      return (
        <Image
          src={userPictures}
          alt='userLogado'
          width={500}
          height={500}
          className='w-11 h-11 rounded-full border shadow-2xl cursor-pointer'
          title='Opções de Usuário'
        />
      )
    }
  }
}
