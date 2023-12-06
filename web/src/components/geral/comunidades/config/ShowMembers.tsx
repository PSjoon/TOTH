'use client'

import { api } from '@/lib/api'
import { fetchData } from 'next-auth/client/_utils'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Members {
  [x: string]: any
}

export function ShowMembers() {
  const [Members, setMembers] = useState<Members | null>(null)
  const [Return, setReturn] = useState('')

  const { id } = useParams()

  const fetchData = async () => {
    const response = await api.get(`/userCommunity/${id}`)

    console.log(response.data)

    setMembers(response.data)
    if (response.status == 200) {
      setReturn('Usuárioa dicionado com sucesso')
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <>
      <div className='h-60 md:w-72 mx-2 lg:ml-14 mb-4 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm text-white-50 bg-gray-200 flex flex-col gap-2 overflow-auto'>
        {Members
          ? Members.map((members: any) => {
              return (
                <>
                  <Link href={`/perfil/${members.id}`}>
                    <div className='border-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 p-1 flex'>
                      <div>
                        <div
                          className='w-[7vw] h-[7vw] md:w-[5vw] md:h-[5vw] lg:w-[4vw] lg:h-[4vw] rounded-full ml-2  bg-white-200 overflow-hidden'
                          title='Acessar Perfis'>
                          <Image
                            src={members.profilePictures}
                            alt='Foto do Usuário'
                            width={128}
                            height={128}
                          />
                        </div>
                      </div>
                      <div className='sm:text-sm md:text-base ml-4'>
                        <p title='Nome do Usuário'>{members.username}</p>
                        <p
                          className='italic text-orange-500'
                          title='Graduação do Usuário'>
                          {members.college[0]}
                        </p>
                      </div>
                    </div>
                  </Link>
                </>
              )
            })
          : null}
      </div>
    </>
  )
}
