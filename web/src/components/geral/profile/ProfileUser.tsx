'use client'

import Image from 'next/image'
import { OptionsProfile } from './OptionsProfile'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimationRedes } from './AnimationRedes'
import { getUserJS } from '@/lib/authGithub'
import User from '/public/iconsGeneral/User2.svg'

interface User {
  [x: string]: any
  id: string
  username: string
  college: string
  github: string
  lattes: string
  linkedin: string
  profilePictures: string
}

export function ProfileUser() {
  const [userData, setUserData] = useState<User | null>(null)
  const { by } = useParams()
  const jwtInFo = getUserJS()
  const [isLogged, setIsLogged] = useState(false)

  const fetchData = async () => {
    try {
      const response = await api.get(`/perfil/${by}`)

      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [by])

  const routes = useRouter()

  useEffect(() => {
    if (!jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }
  }, [])

  return (
    <>
      {userData ? (
        <>
          <div className='md:mx-6 lg:mx-28 lg:ml-[133px] mx-2 border-y-[1px] border-orange-500 rounded-3xl bg-gray-200'>
            <div className='grid grid-cols-2 grid-flow-row p-[11px] items-center'>
              <div>
                <Link href={`/perfil/${userData.id}`}>
                  <div
                    className='w-[11vw] h-[11vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden mb-2'
                    title='Acessar Perfis'>
                    <Image
                      src={userData.profilePictures}
                      alt=''
                      width={128}
                      height={128}
                    />
                  </div>
                </Link>

                <div className='sm:text-sm md:text-xl ml-4'>
                  <p>{userData.username}</p>
                  <div className='italic text-orange-500'>
                    <p>{userData.college[0]}</p>
                  </div>
                </div>
              </div>

              <div className='flex mt-1 mr-8 -mb-2 md:gap-10 gap-5 justify-center items-center'>
                <AnimationRedes
                  redes={[userData.github, userData.linkedin, userData.lattes]}
                />
              </div>
            </div>
          </div>
          <OptionsProfile />
        </>
      ) : null}
    </>
  )
}
