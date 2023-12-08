'use client'

import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { RetornoSearch } from './RetornoSearch'
import Link from 'next/link'
import Image from 'next/image'

interface Community {
  id: string
  comuName: string
  photo: string
  isPublic: string
  description: string
}

export function CommunitySearch() {
  const [searchCommuinityState, setSearchCommuinity] = useState<Community[]>([])

  const fetchData = async () => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const search = urlParams.searchParams.get('search')

    const response = await api.post(`/search/${search}`)

    const searchCommunity: Community[] = response.data.comunidades

    setSearchCommuinity(searchCommunity)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {searchCommuinityState ? (
        searchCommuinityState.map((searchCommuinityState) => {
          return (
            <div
              key={searchCommuinityState.id}
              className='p-4 mb-4 my-4 border-x-[1px] grid grid-flow-col columns-2 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
              {searchCommuinityState.photo ? (
                <Link
                  href={`/comunidades/visualizar/${searchCommuinityState.id}`}>
                  <div className='mx-2 opacity-30'>
                    <Image
                      src={searchCommuinityState.photo}
                      alt=''
                      width={500}
                      height={500}
                      className='md:h-36 aspect-video rounded-xl object-cover'
                    />
                  </div>
                </Link>
              ) : null}

              <Link
                href={`/comunidades/visualizar/${searchCommuinityState.id}`}
                className='flex flex-col justify-center'>
                <p
                  className='ml-2 my-2 italic text-lg text-orange-500'
                  title='Nome da Comunidade'>
                  {searchCommuinityState.comuName}
                </p>

                <div className='h-24 w-52 rounded-lg border border-orange-500 p-2 break-words'>
                  {searchCommuinityState.description}
                </div>
              </Link>
            </div>
          )
        })
      ) : (
        <RetornoSearch />
      )}
    </>
  )
}
