'use client'

import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Camera, Eye, EyeOff, PenSquare, User2, X } from 'lucide-react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { getUserJS } from '@/lib/authGithub'

interface User {
  id: string
  comuName: string
  description: string
  isPublic: boolean
  photo: string
  by: string
}

export function MainConfigComu() {
  const { id } = useParams()
  const routes = useRouter()
  const [text, setText] = useState('')
  const [Descript, setDescript] = useState('')
  const [Title, setTitle] = useState('')
  const [IsPublic, setIsPublic] = useState(false)
  const jwtInFo = getUserJS()

  // get User
  const [userData, setUserData] = useState<User | null>(null)

  const handlePublic = () => {
    setIsPublic(!IsPublic)
  }

  useEffect(() => {
    if (!jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }

    if (userData?.isPublic) {
      setIsPublic(userData.isPublic)
    }
  }, [userData?.isPublic])

  // pictureHover
  const [isHovered, setIsHovered] = useState(false)

  // media Picker
  const [preview, setPreview] = useState<string | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    setDescript(inputValue)

    if (inputValue.length <= 70) {
      setText(inputValue)
    }
  }

  // get User
  const fetchData = async () => {
    try {
      const response = await api.get(`/comunidade/${id}`)

      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])

  // media Picker
  function onPictureSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    } else {
      const previewURL = URL.createObjectURL(files[0])

      setPreview(previewURL)
      setFiles(files)
    }
  }

  console.log(IsPublic)

  // send DB
  async function UpdateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const coverUrlVisible = preview ? preview : userData?.photo
    const titleVisible = Title ? Title : userData?.comuName
    const textVisible = text ? text : userData?.description

    if (preview && files) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', files[0])

      console.log(files)
      console.log(preview)

      const uploadResponse = await api.post('/uploads', uploadFormData)

      const coverUrl = uploadResponse.data.fileUrl
      console.log(coverUrl)

      try {
        const response = await api.put(`/communty/${id}`, {
          comuName: titleVisible,
          description: textVisible,
          isPublic: IsPublic,
          photo: coverUrl,
        })

        console.log(response)

        routes.push(`/comunidades/visualizar/${id}`)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await api.put(`/communty/${id}`, {
          comuName: titleVisible,
          description: textVisible,
          isPublic: IsPublic,
          photo: coverUrlVisible,
        })

        console.log(response)

        routes.push(`/comunidades/visualizar/${id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [Delete, setDelete] = useState(false)
  const [Return, setReturn] = useState('')

  async function DeleteAccount() {
    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.delete(`/perfil/${sub}`)

      if (response) {
        Cookies.remove('token', { path: '/' })
        routes.push('/home')
      } else {
        setReturn('Houve um erro inesperado')
      }

      try {
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      {userData ? (
        <form
          onSubmit={UpdateUser}
          className='p-3 grid gap-5 grid-cols-1 justify-between items-center leading-relaxed'>
          <div className='mx-2 pt-3 px-3 flex justify-between items-center place-items-start leading-relaxed'>
            <div
              className='w-full flex justify-center items-center'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <Image
                src={preview ? preview : userData.photo}
                alt=''
                width={9999}
                height={9999}
                className={`h-32 w-full aspect-video rounded-xl object-cover ${
                  isHovered
                    ? 'md:filter md:blur-sm transition-all ease-in-out duration-100'
                    : ''
                }`}
              />
              {isHovered && (
                <div className=' w-8 h-8 absolute bg-gray-400 rounded-full hidden md:flex justify-center items-center'>
                  <label htmlFor='getPicture'>
                    <PenSquare className='w-[16px] cursor-pointer text-orange-500' />
                  </label>
                </div>
              )}
            </div>
            <input
              onChange={onPictureSelected}
              name='picture'
              type='file'
              accept='image/*'
              id='getPicture'
              className='hidden h-0'
            />
            <label htmlFor='getPicture'>
              <PenSquare className='md:hidden w-5 ml-4 cursor-pointer text-orange-500' />
            </label>
          </div>

          <div className='flex mx-4'>
            <label
              htmlFor='public'
              className='text-sm flex items-center justify-center'>
              <input
                type='checkbox'
                id='public'
                checked={IsPublic}
                title='Permitir que a Comunidade seja Pública?'
                onChange={handlePublic}
                className='w-4 h-4 mr-1 text-orange-500 border-none bg-white-50 bg-opacity-80 focus:ring-orange-500 focus:ring-1 rounded cursor-pointer '
              />
              Comunidade é Pública?
            </label>
          </div>

          <div className='mx-4'>
            <label className='opacity-80 ml-1' htmlFor='title'>
              Título da Comunidade
            </label>
            <input
              type='text'
              id='title'
              placeholder={userData.comuName}
              onChange={(e) => setTitle(e.target.value)}
              name='comuName'
              className='w-full p-[3px] pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0  focus:border-1 focus:border-orange-500'
            />
          </div>

          <div className='form-group mx-4'>
            <label className='opacity-80 ml-1' htmlFor='description'>
              Descrição da Comunidade
            </label>
            <textarea
              className='form-control rounded-lg resize-none border p-3 text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-800 overflow-hidden w-full'
              name=''
              id='description'
              onChange={handleChange}
              maxLength={70}
              rows={3}
              placeholder={userData.description}
            />

            <p className='opacity-60 cursor-default '>
              {70 - text.length}/{70}
            </p>
          </div>

          <div className='flex items-center justify-center place-items-center'>
            <button
              className='w-32 h-14 md:mt-5 -mt-6 mb-1 text-lg rounded-full bg-orange-500'
              type='submit'>
              Confirmar
            </button>
          </div>
        </form>
      ) : null}
    </>
  )
}
