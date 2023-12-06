'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/iconsGeneral/User2.svg'
import { ISODateString } from 'next-auth'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

interface Comunidade {
  [x: string]: any
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

export function ShowShortComu() {
  const [Community, setCommunity] = useState<Comunidade | null>(null)

  const fetchData = async () => {
    const response = await api.get('/comunidade')

    console.log(response.data)

    setCommunity(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='md:h-[85vh] my-4 md:my-0 p-4 mx-2 border-x-[0px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 overflow-auto'>
        {Community
          ? Community.map((community: any) => {
              if (community.isPublic == true) {
                return (
                  <div
                    key={community.id}
                    className='p-4 mb-4 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
                    {community.photo ? (
                      <Link href={`/comunidades/visualizar/${community.id}`}>
                        <div className='mx-2 opacity-30'>
                          <Image
                            src={community.photo}
                            alt=''
                            width={500}
                            height={500}
                            className='md:h-16 w-full aspect-video rounded-xl object-cover'
                          />
                        </div>
                      </Link>
                    ) : null}
                    <Link href={`/comunidades/visualizar/${community.id}`}>
                      <p
                        className='ml-2 my-2 italic text-orange-500'
                        title='Nome Comunidade'>
                        {community.comuName}
                      </p>
                    </Link>

                    <div className='flex items-center gap-4'>
                      <Link href={`/perfil/${community.by}`}>
                        <div
                          className='w-[6vw] h-[6vw] lg:h-[4vw] lg:w-[4vw] ml-2 rounded-full overflow-hidden'
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
                        <div className='text-orange-500 leading-relaxed'>
                          Administrador:
                          <p className='text-white-50 ml-2'>
                            {community.username}
                          </p>
                        </div>
                      </Link>
                      <Link href={`/comunidades/visualizar/${community.id}`}>
                        <div className='h-24 w-36 md:w-44 ml-40 rounded-lg border border-orange-500 p-2 text-sm break-words'>
                          {community.description}
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              }
            })
          : null}
      </div>
    </>
  )
}
