'use client'

import { Camera, Upload } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import dynamic from 'next/dynamic'
import './quill.css'
import Cookies from 'js-cookie'
import { decode } from 'next-auth/jwt'
import { getUserJS } from '@/lib/authGithub'
import { useRouter } from 'next/navigation'

// import 'react-quill/dist/quill.css'

export function ArtigoCreate() {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )

  const modules = {
    toolbar: [
      [{ header: '1' }],
      [{ header: '2' }],
      [{ align: [] }],
      [{ list: 'ordered' }],
      [{ list: 'bullet' }],
      ['bold'],
      ['italic'],
      ['underline'],
      ['clean'],
    ],
  }

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [scielo, setScielo] = useState('')
  const router = useRouter()

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fileUpload = formData.get('coverUrl')
    const filePDFUpload = formData.get('filePDF')
    const jwtInFo = getUserJS()

    let coverUrl = ''
    let filePDF = ''

    if (fileUpload && jwtInFo && filePDFUpload) {
      const { sub } = jwtInFo
      const uploadFormData = new FormData()
      const uploadPDFFormData = new FormData()

      uploadFormData.set('file', fileUpload)
      uploadPDFFormData.set('file', filePDFUpload)

      const uploadResponse = await api.post('/uploads', uploadFormData)
      const uploadPDFResponse = await api.post('/uploadsPDF', uploadPDFFormData)

      coverUrl = uploadResponse.data.fileUrl
      filePDF = uploadPDFResponse.data.fileUrl

      if (!coverUrl) {
        coverUrl = ''
      }

      if (!filePDF) {
        filePDF = ''
      }

      try {
        const response = await api.post('/artigo/criar', {
          title,
          text,
          photo: coverUrl,
          by: sub,
          scielo: scielo,
          file: filePDF,
        })

        if (response) {
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const routes = useRouter()

  const jwtInFo = getUserJS()

  if (!jwtInFo) {
    routes.push('/cadastrar?error=UserLoggedRequire')
  }

  return (
    <form
      onSubmit={HandleSubmit}
      className='mx-2 border-y-[1px] mt-4 md:mt-0 pb-4 md:pb-0 rounded-3xl border-orange-500 text-white-200 md:bg-transparent md:border-none'>
      <div className='absolute flex my-4 md:mt-[40px] md:ml-[30vw] ml-[20vw] items-center justify-center '>
        <div>
          <input
            type='text'
            name='title'
            value={title}
            className='h-full w-52 rounded-2xl border border-y-ore border-x-0 border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Digite o Titulo do Artigo'
          />
        </div>
        <label htmlFor='media' className='hidden md:block'>
          <Camera className='ml-5 text-white-50 hover:text-orange-500 transition-all cursor-pointer' />
        </label>
      </div>

      <div className='hidden md:block md:absolute -z-10'>
        <MediaPicker />
      </div>

      <div className='flex justify-center items-center md:mt-0 -z-10'>
        <ReactQuill value={text} onChange={setText} modules={modules} />
      </div>

      <div className='mt-4 lg:ml-4 ml-[19vw] md:ml-8 grid grid-cols-2 md:grid-cols-3 items-center justify-center'>
        <div className='flex md:ml-8 items-center justify-center'>
          <input
            type='text'
            name='scielo'
            value={scielo}
            className='h-full w-96 rounded-2xl border border-y-ore border-x-0 border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
            onChange={(event) => setScielo(event.target.value)}
            placeholder='Compartilhe seu Scielo'
          />

          <label
            htmlFor='file'
            className='ml-5 text-white-50 hover:text-orange-500 transition-all cursor-pointer '>
            <Upload />
          </label>

          <input
            name='filePDF'
            type='file'
            accept='application/pdf'
            id='file'
            className='invisible h-0'
          />
        </div>

        <div className='flex items-center justify-center -ml-[94px] md:-ml-0'>
          <button
            className='hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
            type='submit'>
            Pronto!
          </button>
        </div>
      </div>
    </form>
  )
}
