'use client'

import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NoPost } from '../../user/NoPost'
import { JustMoreVertical } from '../../main/showPost/iconsState/JustMoreVertical'
import { ISODateString } from 'next-auth'
import { fetchData } from 'next-auth/client/_utils'
import { CommentComu } from './CommentComu'
import { ChevronsDown } from 'lucide-react'
import { type } from 'os'

interface Post {
  [x: string]: any
  by: string
  id: string
  dateCreated: Date
  message: string
  college: string
  reaction: number
  username: string
  profilePictures: string
}
interface CommentOne {
  [x: string]: any
  id: string
  dateCreated: ISODateString
  message: string
  reaction: number
  by: string
  profilePictures: string
  username: string
  college: string
  email: string
}

export function MainCommunit() {
  const [DataPost, setData] = useState<Post | null>(null)
  const [DataCommentTwo, setDataCommentTwo] = useState<CommentOne | null>(null)
  const [Reaction, setReaction] = useState('')
  const [CommentTwoID, setCommentTwoID] = useState('')
  const [Controller, setController] = useState('')
  const [ControllerTwo, setControllerTwo] = useState('')
  const [Return, setReturn] = useState('')

  const { id } = useParams()
  const communityId = id

  async function ActiveComments(commentId: string) {
    console.log(commentId)
    const id = commentId

    try {
      const response = await api.get(`/ListcommentOneComu/${id}`)

      setDataCommentTwo(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`/post/${communityId}`)

      if (response.data.length) {
        setData(response.data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const arrowUp = async (artigoId: string) => {
    setController(artigoId)
    try {
      const response = await api.post('/arrowUpPostOne', {
        artigoId,
      })

      setReaction(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const arrowUpCommentTwo = async (commentTwoId: string) => {
    setControllerTwo(commentTwoId)
    try {
      const response = await api.post('/arrowUp/PostComment', {
        commentTwoId,
      })

      setReaction(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <>
      {DataPost ? (
        DataPost.map((post: any) => {
          return (
            <>
              <main
                key={DataPost.id}
                className='mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
                <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
                  <div className='p-2 mt-4 flex justify-center items-center'>
                    <Link href={`/perfil/${post.by}`}>
                      <div
                        className='w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden'
                        title='Acessar Perfis'>
                        <Image
                          src={post.profilePictures}
                          alt='Foto do Usuário'
                          width={128}
                          height={128}
                        />
                      </div>
                    </Link>

                    <div className='sm:text-sm md:text-lg ml-4'>
                      <p title='Nome do Usuário'>{post.username}</p>
                      <p
                        className='italic text-orange-500'
                        title='Graduação do Usuário'>
                        {post.college[0]}
                      </p>
                    </div>
                  </div>

                  <JustMoreVertical artigo={post} />
                </header>

                <div className='h-auto mt-2 mx-3 mb-2 p-7 rounded-[25px] overflow-hidden cursor-pointer'>
                  <p className=' mb-4 ml-1 text-ellipsis line-clamp-1 text-lg'>
                    {post.message}
                  </p>
                </div>

                <footer className='h-[7vh] mx-10 flex pb-6 items-center justify-between'>
                  <div className='w-[22%]  grid grid-cols-3 gap-5'>
                    <Image
                      src={downIcon}
                      alt='Avaliação Negativa'
                      title='Avaliação Negativa'
                      className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition transform hover:translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                    />

                    <Image
                      src={upIcon}
                      alt='Avaliação Positiva'
                      title='Avaliação Positiva'
                      onClick={() => arrowUp(post.id)}
                      className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                    />
                  </div>

                  <div className=' gap-3 mb-10 cursor-default'>
                    <p className='opacity-20' title='Data de Criação'>
                      {dayjs(post.dateCreated).format('DD/MM/YYYY')}
                    </p>
                    <div className='flex gap-6'>
                      <div className='flex opacity-60 text-orange-500 justify-start items-center'>
                        <Image
                          src={upIcon}
                          title='Avaliação Positiva'
                          alt='Avaliação Positiva'
                          className='w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                        />
                        <p className='ml-2'>
                          {Controller == post.id
                            ? Reaction
                              ? Reaction
                              : post.reaction
                            : post.reaction}
                        </p>
                      </div>
                      <ChevronsDown
                        onClick={() => {
                          setCommentTwoID(post.id)
                          ActiveComments(post.id)
                        }}
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                </footer>
              </main>
              {CommentTwoID === post.id ? (
                <CommentComu postId={CommentTwoID} />
              ) : null}

              {CommentTwoID === post.id
                ? DataCommentTwo
                  ? DataCommentTwo.map((commentTwo: any) => (
                      <>
                        <div className='h-[305px] mx-2 lg:mx-56 lg:ml-72 mb-4 border-b-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-300'>
                          <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
                            <div className='p-2 mt-4 flex justify-center items-center'>
                              <Link href={`/perfil/${commentTwo.by}`}>
                                <div
                                  className='w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden'
                                  title='Acessar Perfis'>
                                  <Image
                                    src={commentTwo.profilePictures}
                                    alt='Foto do Usuário'
                                    width={128}
                                    height={128}
                                  />
                                </div>
                              </Link>

                              <div className='sm:text-sm md:text-lg ml-4'>
                                <p title='Nome do Usuário'>
                                  {commentTwo.username}
                                </p>
                                <p
                                  className='italic text-orange-500'
                                  title='Graduação do Usuário'>
                                  {commentTwo.college[0]}
                                </p>
                              </div>
                            </div>

                            <JustMoreVertical artigo={commentTwo} />
                          </header>

                          <div className='h-[50%] text-lg m-4 border border-orange-500 rounded-lg text-justify p-2 bg-gray-300'>
                            <p>{commentTwo.message}</p>
                          </div>

                          <div className='flex ml-10 -mt-2 gap-4'>
                            <Image
                              src={downIcon}
                              alt='Avaliação Negativa'
                              className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                              title='Avaliação Negativa'
                            />
                            <Image
                              src={upIcon}
                              alt='Avaliação Positiva'
                              onClick={() => arrowUpCommentTwo(commentTwo.id)}
                              className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                              title='Avaliação Positiva'
                            />
                          </div>
                          <div className='flex opacity-60 text-orange-500 justify-start items-center float-right -mt-6 mr-4 cursor-pointer'>
                            <Image
                              src={upIcon}
                              title='Avaliação Positiva'
                              alt='Avaliação Positiva'
                              className='w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                            />
                            <p className='ml-2'>
                              {ControllerTwo == commentTwo.id
                                ? Reaction
                                  ? Reaction
                                  : commentTwo.reaction
                                : commentTwo.reaction}
                            </p>
                          </div>
                        </div>
                      </>
                    ))
                  : null
                : null}
            </>
          )
        })
      ) : (
        <NoPost />
      )}
    </>
  )
}
