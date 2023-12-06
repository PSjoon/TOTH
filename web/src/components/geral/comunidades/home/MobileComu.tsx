'use client'

import { Camera, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Transition } from '@headlessui/react'
import { MediaPickerComu } from '../create/MediaPickerComu'
import { getUserJS } from '@/lib/authGithub'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export function MobileComu() {
  const [createVisivel, setCreateVisivel] = useState(false)
  const [listVisivel, setLlistVisivel] = useState(true)
  const [changeText, setChangeText] = useState(true)
  const [text, setText] = useState('')
  const [IsPublic, setIsPublic] = useState('')
  const [Title, setTitle] = useState('')
  const [Descript, setDescript] = useState('')
  const router = useRouter()

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    setDescript(inputValue)

    if (inputValue.length <= 70) {
      setText(inputValue)
    }
  }

  const toggleDiv = () => {
    setCreateVisivel(!createVisivel)
    setChangeText(!changeText)
    setLlistVisivel(!listVisivel)
  }

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fileUpload = formData.get('coverUrl')
    const jwtInFo = getUserJS()

    console.log(fileUpload)

    let coverUrl = ''

    if (jwtInFo && fileUpload) {
      const { sub } = jwtInFo
      const uploadFormData = new FormData()

      uploadFormData.set('file', fileUpload)

      console.log(uploadFormData)

      const uploadResponse = await api.post('/uploads', uploadFormData)

      console.log(uploadResponse)

      coverUrl = uploadResponse.data.fileUrl

      if (!coverUrl) {
        coverUrl = ''
      }

      console.log(coverUrl)
      console.log(IsPublic)
      console.log(Title)
      console.log(Descript)
      console.log(sub)

      const isPublic = Boolean(IsPublic)

      try {
        const response = await api.post('/comunidade/criar', {
          by: sub,
          photo: coverUrl,
          isPublic,
          comuName: Title,
          description: Descript,
        })
        if (response) {
          console.log(response.data)
          router.push('/')
        }
      } catch (error) {}
    }
  }

  return (
    <div className='w-[100%] p-2 py-4 border-x-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 flex flex-col justify-center items-center'>
      <div
        onClick={toggleDiv}
        className='flex w-[60%] p-1 text-lg gap-2 justify-center bg-orange-500 rounded-3xl hover:bg-orange-800 cursor-pointer'>
        <div className='flex items-center justify-center gap-1 px-'>
          <p>Criar Comunidade</p>
        </div>
      </div>

      <form onSubmit={HandleSubmit} className='w-[65%] '>
        <div className='flex justify-center m-6 mb-8'>
          <label
            htmlFor='public'
            className='text-sm flex items-center justify-center'>
            <input
              type='checkbox'
              id='public'
              title='Permitir que a Comunidade seja Pública?'
              onChange={(event) => setIsPublic(event.target.value)}
              className='w-4 h-4 mr-1 text-orange-500 border-none bg-white-50 bg-opacity-80 focus:ring-orange-500 focus:ring-1 rounded cursor-pointer '
            />
            Comunidade é Pública?
          </label>
        </div>

        <div className='flex flex-col gap-6 items-center justify-center'>
          <input
            type='text'
            name='title'
            // value={title}
            className='h-full w-60 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Digite o Titulo da Comunidade'
          />

          <div className='form-group'>
            <textarea
              className='form-control rounded-lg resize-none border border-orange-500 p-3 text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200 overflow-hidden'
              name=''
              id=''
              onChange={handleChange}
              maxLength={70}
              rows={3}
              placeholder='Digite a Descrição da Comunidade'
            />

            <p className='opacity-60 cursor-default '>
              {70 - text.length}/{70}
            </p>
          </div>

          <div className='flex items-center justify-center'>
            <button
              className='hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
              type='submit'>
              Criar!
            </button>
          </div>
        </div>
      </form>

      {listVisivel && (
        <Link
          href={'/comunidades/listar'}
          className='flex md:w-[50%] w-[60%] mt-10 p-1 px-4 md:p-1 text-lg gap-2 justify-center bg-orange-500 rounded-3xl hover:bg-orange-800'>
          Listar Comunidades
        </Link>
      )}
    </div>
  )
}
