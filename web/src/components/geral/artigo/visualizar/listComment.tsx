'use client'

import { api } from '@/lib/api'
import { ISODateString } from 'next-auth'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { OptionsPost } from '../../main/showPost/iconsState/OptionsPost'
import downIcon from '/public/iconsPost/down.svg'
import upIcon from '/public/iconsPost/up.svg'
import { ChevronsDown } from 'lucide-react'
import { getUserJS } from '@/lib/authGithub'
import { JustMoreVertical } from '../../main/showPost/iconsState/JustMoreVertical'

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

export function ListComment() {
  const [DataComment, setDataComment] = useState<CommentOne | null>(null)
  const [DataCommentTwo, setDataCommentTwo] = useState<CommentOne | null>(null)
  const [CommentTwoID, setCommentTwoID] = useState('')
  const [CommentTwo, setCommentTwo] = useState('')
  const [Reaction, setReaction] = useState('')

  const { id } = useParams()
  const jwtInFo = getUserJS()

  const fetchData = async () => {
    try {
      const response = await api.get(`/ListcommentOne/${id}`)

      setDataComment(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const arrowUp = async (commentId: string) => {
    try {
      const response = await api.post('/arrowUp/Comment', {
        commentId,
      })

      setReaction(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const arrowUpCommentTwo = async (commentId: string) => {
    try {
      const response = await api.post('/arrowUp/CommentTwo', {
        commentId,
      })

      setReaction(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  async function ActiveComments(commentId: string) {
    console.log(commentId)
    const id = commentId

    try {
      const response = await api.get(`/ListcommentTwo/${id}`)

      setDataCommentTwo(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (jwtInFo) {
      try {
        const response = await api.post('/commentTwo', {
          CommentTwoID,
          sub: jwtInFo.sub,
          comment: CommentTwo,
        })
        if (response) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      {DataComment ? (
        DataComment.map((comment: any) => (
          <>
            <div className='h-[305px] mx-2 lg:mx-52 mb-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 '>
              <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
                <div className='p-2 mt-4 flex justify-center items-center'>
                  <Link href={`/perfil/${comment.by}`}>
                    <div
                      className='w-[11vw] h-[11vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden'
                      title='Acessar Perfis'>
                      <Image
                        src={comment.profilePictures}
                        alt='Foto do Usuário'
                        width={128}
                        height={128}
                      />
                    </div>
                  </Link>

                  <div className='sm:text-sm md:text-lg ml-4'>
                    <p title='Nome do Usuário'>{comment.username}</p>
                    <p
                      className='italic text-orange-500'
                      title='Graduação do Usuário'>
                      {comment.college[0]}
                    </p>
                  </div>
                </div>

                <JustMoreVertical artigo={comment} />
              </header>

              <div className='h-[50%] text-lg m-4 border border-orange-500 rounded-lg text-justify p-2 bg-gray-300'>
                <p>{comment.message}</p>
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
                  onClick={() => arrowUp(comment.id)}
                  className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                  title='Avaliação Positiva'
                />
              </div>
              <div className='float-right flex gap-4 -mt-6 mr-4 cursor-pointer'>
                <div className='flex opacity-60 text-orange-500 justify-start items-center'>
                  <Image
                    src={upIcon}
                    title='Avaliação Positiva'
                    alt='Avaliação Positiva'
                    className='w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none cursor-pointer'
                  />
                  <p className='ml-2'>
                    {Reaction ? Reaction : comment.reaction}
                  </p>
                </div>
                {CommentTwoID != comment.id ? (
                  <ChevronsDown
                    onClick={() => {
                      setCommentTwoID(comment.id)
                      ActiveComments(comment.id)
                    }}
                  />
                ) : null}
              </div>
            </div>
            {CommentTwoID === comment.id ? (
              <>
                <form
                  className='mx-2 lg:mx-56 lg:ml-72 mb-4 gap-4 flex items-center justify-center'
                  onSubmit={HandleSubmit}>
                  <input
                    type='text'
                    onChange={(event) => {
                      setCommentTwo(event.target.value)
                    }}
                    placeholder='Comentar...'
                    className='h-full w-full rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
                  />

                  <div className='justify-center items-center'>
                    <button
                      className='hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
                      type='submit'
                      title='Postar Comentário'>
                      Postar!
                    </button>
                  </div>
                </form>

                {DataCommentTwo
                  ? DataCommentTwo.map((commentTwo: any) => (
                      <>
                        <div className='h-[305px] mx-2 lg:mx-56 lg:ml-72 mb-4 border-b-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-300'>
                          <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
                            <div className='p-2 mt-4 flex justify-center items-center'>
                              <Link href={`/perfil/${commentTwo.by}`}>
                                <div
                                  className='w-[11vw] h-[11vw] md:w-[6vw] md:h-[6vw] lg:w-[5vw] rounded-full lg:h-[5vw] ml-2  bg-white-200 overflow-hidden'
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
                              {Reaction ? Reaction : comment.reaction}
                            </p>
                          </div>
                        </div>
                      </>
                    ))
                  : null}
              </>
            ) : null}
          </>
        ))
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  )
}
