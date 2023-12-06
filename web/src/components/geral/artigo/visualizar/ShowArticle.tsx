'use client'

import { api } from '@/lib/api'
import { ISODateString } from 'next-auth'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { OptionsPost } from '../../main/showPost/iconsState/OptionsPost'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import scielo from '/public/iconsPost/scielo.svg'
import scieloHover from '/public/iconsPost/scieloHover.svg'
import { Download } from 'lucide-react'

interface ArtigoUser {
  id: string
  dateCreated: ISODateString
  photo: string
  reaction: number
  text: string
  title: string
  by: string
  file: string
  scielo: string
  profilePictures: string
  username: string
  college: string
  email: string
}

export function ShowArticle() {
  const [userData, setUserData] = useState<ArtigoUser | null>(null)
  const [Reaction, setReaction] = useState('')
  const [Return, setReturn] = useState('')

  const { id } = useParams()

  const fetchData = async () => {
    try {
      const response = await api.get(`/artigo/visualizar/${id}`)

      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const arrowUp = async (artigoId: string) => {
    try {
      const response = await api.post('/arrowUp', {
        artigoId,
      })

      setReaction(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  function CopyUrlFunc(artigoId: string) {
    const url = location.href
    // const url = `http://localhost:3000/artigo/visualizar/${artigoId}`
    navigator.clipboard.writeText(url)

    setReturn('Copiado')
  }

  return (
    <>
      {userData ? (
        <>
          <main
            key={userData.id}
            className='mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
            <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
              <div className='p-2 my-4 flex justify-center items-center'>
                <Link href={`/perfil/${userData.by}`}>
                  <div
                    className='w-[9vw] h-[9vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] lg:h-[5vw] rounded-full ml-2  bg-white-200 overflow-hidden'
                    title='Acessar Perfis'>
                    <Image
                      src={userData.profilePictures}
                      alt='Foto do Usuário'
                      width={128}
                      height={128}
                    />
                  </div>
                </Link>

                <div className='md:text-lg ml-4'>
                  <p title='Nome do Usuário'>{userData.username}</p>
                  <p
                    className='italic text-orange-500'
                    title='Graduação do Usuário'>
                    {userData.college[0]}
                  </p>
                </div>
              </div>

              <OptionsPost artigo={userData} />
            </header>
            {userData.photo ? (
              <div className='mx-2 opacity-30'>
                <Image
                  src={userData.photo}
                  alt=''
                  width={500}
                  height={500}
                  className='h-44 w-full aspect-video rounded-xl object-cover'
                />
              </div>
            ) : null}

            <div className='h-auto my-2 mx-3 mb-2 p-7 rounded-[25px] overflow-hidden cursor-pointer'>
              <p className='text-orange-500 mb-4 ml-1 text-ellipsis line-clamp-1 text-lg'>
                {userData.title}
              </p>
              <div dangerouslySetInnerHTML={{ __html: userData.text }} />
            </div>

            <footer className='h-[7vh] mx-10 flex pb-6 items-center justify-between'>
              <div className=' w-[50%] flex gap-6'>
                <Image
                  src={shareIcon}
                  alt='Compartilhar'
                  title='Compartilhar'
                  onClick={CopyUrlFunc.bind(null, userData.id)}
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 cursor-pointer'
                />

                <Image
                  src={downIcon}
                  alt='Avaliação Negativa'
                  title='Avaliação Negativa'
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                />

                <Image
                  src={upIcon}
                  alt='Avaliação Positiva'
                  onClick={() => arrowUp(userData.id)}
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                  title='Avaliação Positiva'
                />

                {userData.file ? (
                  <Link href={userData.file} target='_blank'>
                    <div className='grid grid-flow-col grid-cols-1 bg-gray-300 border border-orange-500 rounded-lg py-0.5 px-2 gap-2 hover:text-orange-500'>
                      <p className='flex items-center justify-center '>
                        Baixar PDF
                      </p>
                      <Download />
                    </div>
                  </Link>
                ) : null}

                {userData.scielo ? (
                  <Link
                    href={userData.scielo}
                    target='_blank'
                    className='w-24 justify-center items-center bg-gray-300 border border-orange-500 rounded-lg py-0.5 px-1'>
                    <p className='flex items-center justify-center hover:text-orange-500'>
                      Link Scielo
                    </p>
                  </Link>
                ) : null}
              </div>
              <div className='gap-3 mb-6 cursor-default'>
                <p className='opacity-20' title='Data de Criação'>
                  {dayjs(userData.dateCreated).format('DD/MM/YYYY')}
                </p>
                <div className='flex opacity-60 text-orange-500 justify-start items-center'>
                  <Image
                    src={upIcon}
                    title='Avaliação Positiva'
                    alt='Avaliação Positiva'
                    className='w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                  />
                  <p className='ml-2'>
                    {Reaction ? Reaction : userData.reaction}
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </>
      ) : null}
    </>
  )
}
