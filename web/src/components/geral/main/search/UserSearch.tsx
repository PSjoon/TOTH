'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import Image from 'next/image'
import { OptionsPost } from '../showPost/iconsState/OptionsPost'
import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import { RetornoSearch } from './RetornoSearch'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export function UserSearch() {
  interface User {
    id: string
    username: string
    college: string
    profilePictures: string
  }
  const [searchUserState, setSearchUser] = useState<User[]>([])

  const fetchData = async () => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const search = urlParams.searchParams.get('search')

    const response = await api.post(`/search/${search}`)

    const searchUser: User[] = response.data.usuario

    setSearchUser(searchUser)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {searchUserState ? (
        searchUserState.map((searchUserState) => {
          return (
            <div className='md:mx-6 my-2 lg:mx-28 lg:ml-[133px] mx-2 border-y-[1px] border-orange-500 rounded-3xl bg-gray-200'>
              <div className='grid grid-cols-2 grid-flow-row p-[11px] items-center'>
                <div>
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
                      <p>{searchUserState.college[0]}</p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <RetornoSearch />
      )}
    </>
  )
}
