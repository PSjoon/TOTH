'use client'

import { api } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NoComu } from '../user/NoComu'
import { NoComuR } from '../user/NoComuR'

interface User {
  [x: string]: any
  id: string
  comuName: string
  description: string
  isPublic: boolean
  photo: string
  by: string
}

export function ProfileComuni() {
  const [userData, setUserData] = useState<User | null>(null)
  const { by } = useParams()

  const fetchData = async () => {
    try {
      const response = await api.get(`/user/${by}`)

      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [by])

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 grid-flow-row gap-x-24'>
      {userData?.length >= 1 ? (
        userData?.map((comuUser: any) => (
          <>
            <div
              key={comuUser.id}
              className='p-4 mx-2 mb-8 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
              {comuUser.photo ? (
                <Link href={`/comunidades/visualizar/${comuUser.id}`}>
                  <div className='mx-2 opacity-30'>
                    <Image
                      src={comuUser.photo}
                      alt='Imagem Fundo'
                      width={500}
                      height={500}
                      className='h-16 w-full aspect-video rounded-xl object-cover'
                    />
                  </div>
                </Link>
              ) : null}
              <div>
                <Link href={`/comunidades/visualizar/${comuUser.id}`}>
                  <p
                    className='ml-2 my-2 italic text-orange-500'
                    title='Nome Comunidade'>
                    {comuUser.comuName}
                  </p>
                </Link>

                <Link href={`/comunidades/visualizar/${comuUser.id}`}>
                  <div className='h-24 w-[16vw] lg:w-[10vw] ml-[18vw] lg:ml-[14vw] -mt-8 rounded-lg border border-orange-500 p-2 text-sm break-words'>
                    {comuUser.description}
                  </div>
                </Link>
              </div>
            </div>
          </>
        ))
      ) : (
        <>
          <NoComu />
          <NoComuR />
        </>
      )}
    </div>
  )
}
