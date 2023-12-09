'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import Image from 'next/image'
import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { RetornoSearch } from '../../main/search/RetornoSearch'
import { useParams } from 'next/navigation'
import { getUserJS } from '@/lib/authGithub'

export function ShowFollow() {
  interface User {
    id: string
    username: string
    college: string
    profilePictures: string
  }
  const [searchUserState, setSearchUser] = useState<User[]>([])

  const fetchData = async () => {
    const jwtInFo = getUserJS()
    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.get(`/showfollow/${sub}`)

      const searchUser: User[] = response.data

      setSearchUser(searchUser)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {searchUserState.length >= 1 ? (
        searchUserState.map((searchUserState) => {
          return (
            <div className='flex p-4 justify-center items-center border border-y-orange-500 mx-32 rounded-3xl my-4 bg-gray-300'>
              <Link href={`/perfil/${searchUserState.id}`}>
                <div
                  className='w-[11vw] h-[11vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden mb-2'
                  title='Acessar Perfis'>
                  <Image
                    src={searchUserState.profilePictures}
                    alt=''
                    width={128}
                    height={128}
                  />
                </div>
              </Link>

              <div className='sm:text-sm md:text-xl ml-4'>
                <p>{searchUserState.username}</p>

                <p className='italic text-orange-500'>
                  {searchUserState.college[0]}
                </p>
              </div>
            </div>
          )
        })
      ) : (
        <>
          <div className='flex justify-center items-center mt-[25%] p-8 border border-y-orange-500 mx-32 rounded-3xl bg-gray-300'>
            <p>Nenhum Seguidor Encontrado</p>
          </div>
        </>
      )}
    </>
  )
}
