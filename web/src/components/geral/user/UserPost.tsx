import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ISODateString, User } from 'next-auth'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import { useState, useEffect } from 'react'
import { OptionsPost } from '../main/showPost/iconsState/OptionsPost'
import Link from 'next/link'
import { NoPost } from './NoPost'

interface Artigo {
  [x: string]: any
  id: string
  dateCreated: ISODateString
  photo: string
  reaction: number
  text: string
  title: string
  by: string
  savedPosts: string
  profilePictures: string
  username: string
  college: string
  email: string
}
export function UserPost() {
  const [userData, setUserData] = useState<Artigo | null>(null)
  const [Reaction, setReaction] = useState('')
  const [Return, setReturn] = useState('')

  const { by } = useParams()

  const fetchData = async () => {
    try {
      const response = await api.get(`/artigo/${by}`)

      if (response.data.length) {
        setUserData(response.data)
      }
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
  }, [by])

  function CopyUrlFunc(artigoId: string) {
    // const url = location.href
    const url = `http://localhost:3000/artigo/visualizar/${artigoId}`
    navigator.clipboard.writeText(url)

    setReturn('Copiado')
  }

  return (
    <>
      {userData ? (
        userData.map((artigo: any) => (
          <main
            key={artigo.id}
            className='mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
            <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
              <div className='p-2 mt-4 flex justify-center items-center'>
                <Link href={`/perfil/${artigo.by}`}>
                  <div
                    className='w-[11vw] h-[11vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden'
                    title='Acessar Perfis'>
                    <Image
                      src={artigo.profilePictures}
                      alt=''
                      title='Foto Usuário'
                      width={128}
                      height={128}
                    />
                  </div>
                </Link>
                <div className='sm:text-sm md:text-lg ml-4'>
                  <p title='Nome do Usuário'>{artigo.username}</p>
                  <p
                    className='italic text-orange-500'
                    title='Graduação do Usuário'>
                    {artigo.college[0]}
                  </p>
                </div>
              </div>
              <OptionsPost artigo={artigo} />
            </header>

            <section className='px-3'>
              <div className='h-auto mt-2 mx-3 mb-2 p-4 rounded-[25px] overflow-hidden'>
                <Link href={`/artigo/visualizar/${artigo.id} `}>
                  <p className='text-orange-500 mb-4 ml-2 text-ellipsis line-clamp-1 text-lg'>
                    {artigo.title}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: artigo.text }}
                    className='line-clamp-4'
                  />
                </Link>
              </div>
            </section>
            <footer className='h-[7vh] mx-10 flex pb-6 items-center justify-between'>
              <div className='lg:w-[24%] md:w-[22%] w-[50%] grid grid-cols-3 gap-5'>
                <Image
                  src={shareIcon}
                  alt='Compartilhar'
                  onClick={CopyUrlFunc.bind(null, artigo.id)}
                  title='Compartilhar'
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 cursor-pointer'
                />
                <Image
                  src={downIcon}
                  title='Avaliação Negativa'
                  alt='Avaliação Negativa'
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition transform hover:translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                />
                <Image
                  src={upIcon}
                  title='Avaliação Positiva'
                  onClick={() => arrowUp(artigo.id)}
                  alt='Avaliação Positiva'
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer '
                />
              </div>
              <div className='gap-3 mb-6 cursor-default'>
                <p className='opacity-20' title='Data de Criação'>
                  {dayjs(artigo.dateCreated).format('DD/MM/YYYY')}
                </p>
                <div className='flex opacity-60 text-orange-500 justify-start items-center'>
                  <Image
                    src={upIcon}
                    title='Avaliação Positiva'
                    alt='Avaliação Positiva'
                    className='w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                  />
                  <p className='ml-2'>
                    {Reaction ? Reaction : artigo.reaction}
                  </p>
                </div>
              </div>
            </footer>
          </main>
        ))
      ) : (
        <NoPost />
      )}
    </>
  )
}
