import { getUserJS } from '@/lib/authGithub'
import Image from 'next/image'
import { ProfilePicture } from './ProfilePicture'

export function ProfilePictureOn() {
  const jwtInFo = getUserJS()

  if (jwtInFo) {
    const { profilePictures } = jwtInFo

    if (profilePictures) {
      return (
        <Image
          src={profilePictures}
          alt='userLogado'
          width={500}
          height={500}
          className='w-11 h-11 rounded-full border shadow-2xl cursor-pointer'
          title='Opções de Usuário'
        />
      )
    }
  }
  return <ProfilePicture />
}
