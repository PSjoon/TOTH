import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/iconsGeneral/User2.svg'
import { ISODateString } from 'next-auth'
import { api } from '@/lib/api'
import { fetchData } from 'next-auth/client/_utils'
import { useEffect } from 'react'
import { getUserJS } from '@/lib/authGithub'
import { useRouter } from 'next/router'

interface Comunidade {
  id: string
  by: string
  photo: string
  isPublic: boolean
  comuName: string
  description: string

  profilePictures: string
  username: string
  email: string
}

export async function ListarComu() {
  const response = await api.get('/comunidade')
  const community: Comunidade[] = response.data

  const routes = useRouter()
  const jwtInFo = getUserJS()

  useEffect(() => {
    if (!jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }
  }, [])

  return (
    <>
      <div className='md:h-[85vh] h-[70vh]  mx-2 p-4 border-x-[0px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 overflow-auto'>
        {community.map((community) => {
          return (
            <div
              key={community.id}
              className='p-4 mb-4 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
              {community.photo ? (
                <div className='mx-2 opacity-30'>
                  <Image
                    src={community.photo}
                    alt=''
                    width={500}
                    height={500}
                    className='md:h-16 h-12 w-full aspect-video rounded-xl object-cover'
                  />
                </div>
              ) : null}
              <Link href={`/comunidade/${community.id}`}>
                <p
                  className='ml-2 my-2 italic text-orange-500'
                  title='Nome Comunidade'>
                  {community.comuName}
                </p>
              </Link>

              <div className='flex items-center gap-4'>
                <Link href={`/perfil/${community.by}`}>
                  <div
                    className='w-[11vw] h-[11vw] md:w-[6vw] md:h-[6vw] lg:h-[4vw] lg:w-[4vw] ml-2 rounded-full overflow-hidden'
                    title='Acessar Perfis'>
                    <Image
                      src={community.profilePictures}
                      alt='Foto do Usuário'
                      width={128}
                      height={128}
                    />
                  </div>
                </Link>

                <Link href={`/perfil/${community.by}`}>
                  <div className='text-orange-500 leading-relaxed md:block flex'>
                    Administrador:
                    <p className='text-white-50 ml-2'>{community.username}</p>
                  </div>
                </Link>

                <Link href={`/comunidade/${community.id}`}>
                  <div className='hidden md:block md:h-24 md:w-44 w-20 h-10 ml-40 rounded-lg border border-orange-500 p-2 text-sm break-words'>
                    {community.description}
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
