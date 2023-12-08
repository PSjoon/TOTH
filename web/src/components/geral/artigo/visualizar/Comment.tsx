'use client'

import downIcon from '/public/iconsPost/down.svg'
import upIcon from '/public/iconsPost/up.svg'
import Image from 'next/image'
import { getUserJS } from '@/lib/authGithub'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import Link from 'next/link'
import { ListComment } from './listComment'

export function Comment() {
  const [text, setText] = useState('')
  const [Comment, setComment] = useState('')
  const [IsJwt, setIsJwt] = useState(false)
  const jwtInFo = getUserJS()
  const { id } = useParams()

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    setComment(inputValue)

    if (inputValue.length <= 500) {
      setText(inputValue)
    }
  }

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (id && jwtInFo) {
      try {
        const response = await api.post('/commentOne', {
          id,
          sub: jwtInFo.sub,
          comment: Comment,
        })

        if (response) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const routes = useRouter()

  useEffect(() => {
    const jwtInFo = getUserJS()

    if (jwtInFo) {
      setIsJwt(!IsJwt)
    }
  }, [])

  return (
    <>
      {IsJwt ? (
        <div className='h-[290px] mx-2 lg:mx-52 mb-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 flex justify-center items-center'>
          <form
            className='mx-8 -mt-4 items-center justify-center'
            onSubmit={HandleSubmit}>
            <p className='italic text-orange-500 text-lg p-2'>
              Criar Comentário
            </p>
            <div className=''>
              <textarea
                className='h-[25vh] w-[80vw] lg:w-[45vw] form-control rounded-lg resize-none border border-orange-500 p-3 text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-300'
                name=''
                id=''
                onChange={handleChange}
                maxLength={500}
                placeholder='Digite seu comentário'
              />

              <p className='text-gray-500  cursor-default'>
                {500 - text.length}/{500}
              </p>
            </div>

            <div className='flex ml-[50vw] md:ml-[50vw] lg:ml-[38vw] -mt-5 justify-center items-center'>
              <button
                className=' hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
                type='submit'
                title='Postar Comentário'>
                Postar!
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className='h-[290px] mx-2 lg:mx-52 mb-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 flex justify-center items-center'>
            <div className='flex leading-relaxed'>
              Realize o
              <Link href={'/cadastrar'}>
                <p className='mx-1'>Cadastro</p>
              </Link>
              para Conseguir Comentar
            </div>
          </div>
        </>
      )}
    </>
  )
}
