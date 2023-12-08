'use client'

import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api'
import { OptionsPost } from './showPost/iconsState/OptionsPost'
import dayjs from 'dayjs'
import { ISODateString } from 'next-auth'
import { Switch } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { fetchData } from 'next-auth/client/_utils'
import { getUserJS } from '@/lib/authGithub'
import { useRouter } from 'next/navigation'
import { RetornoLogin } from '../cadastroLogin/RetornoLogin'
import { ReturnAll } from '../retorno/ReturnAll'

interface Artigo {
  [x: string]: any
  id: string
  dateCreated: ISODateString
  photo: string
  reaction: number
  text: string
  title: string
  by: string
  profilePictures: string
  username: string
  savedPosts: string
  college: string
  email: string
  scielo: string
  file: string
}

export function Main() {
  const [Article, setArticle] = useState<Artigo | null>(null)
  const [Reaction, setReaction] = useState('')
  const [Controller, setController] = useState('')
  const [Return, setReturn] = useState('')

  const fetchData = async () => {
    try {
      const response = await api.get('/artigo')
      if (response.data) {
        setArticle(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const routes = useRouter()
  const jwtInFo = getUserJS()

  const arrowUp = async (artigoId: string) => {
    if (!jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }

    setController(artigoId)
    try {
      const response = await api.post('/arrowUp', {
        artigoId,
      })

      setReaction(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  function CopyUrlFunc(artigoId: string) {
    // const url = location.href
    const url = `http://localhost:3000/artigo/visualizar/${artigoId}`
    navigator.clipboard.writeText(url)

    setReturn('Copiado')
  }

  const arrowDown = () => {
    if (!jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }
  }

  const [message, setMessage] = useState('')

  useEffect(() => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const messageParam = urlParams.searchParams.get('error')
    if (messageParam) {
      setMessage(messageParam)

      const timeout = setTimeout(() => {
        setMessage('')
      }, 10000)
      return () => clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {message ? <ReturnAll message={message} /> : null}
      {Return ? <ReturnAll message={Return} /> : null}

      {Article
        ? Article.map((artigo: any) => {
            return (
              <main
                key={artigo.id}
                className='mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
                <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
                  <div className='p-2 mt-4 flex justify-center items-center'>
                    <Link href={`/perfil/${artigo.by}`}>
                      <div
                        className='w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] lg:h-[5vw] rounded-full ml-2  bg-white-200 overflow-hidden'
                        title='Acessar Perfil'>
                        <Image
                          src={artigo.profilePictures}
                          alt='Foto do Usuário'
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

                <Link href={`/artigo/visualizar/${artigo.id} `}>
                  <div className='h-auto mt-2 mx-3 mb-2 p-7 rounded-[25px] overflow-hidden cursor-pointer'>
                    <p className='text-orange-500 mb-4 ml-1 text-ellipsis line-clamp-1 text-lg'>
                      {artigo.title}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: artigo.text }}
                      className='line-clamp-4'
                    />
                  </div>
                </Link>

                <footer className='h-[7vh] mx-10 flex pb-6 items-center justify-between'>
                  <div className='lg:w-[24%] md:w-[22%] w-[50%] grid grid-cols-3 gap-5'>
                    <Image
                      src={shareIcon}
                      title='Compartilhar'
                      alt='Compartilhar'
                      onClick={CopyUrlFunc.bind(null, artigo.id)}
                      className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 cursor-pointer'
                    />

                    <Image
                      src={downIcon}
                      alt='Avaliação Negativa'
                      title='Avaliação Negativa'
                      onClick={arrowDown}
                      className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                    />

                    <Image
                      src={upIcon}
                      onClick={() => arrowUp(artigo.id)}
                      title='Avaliação Positiva'
                      alt='Avaliação Positiva'
                      className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
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
                      <p className='ml-2' title='Total de Avaliações'>
                        {Controller == artigo.id
                          ? Reaction
                            ? Reaction
                            : artigo.reaction
                          : artigo.reaction}
                      </p>
                    </div>
                  </div>
                </footer>
              </main>
            )
          })
        : null}
    </>
  )
}
