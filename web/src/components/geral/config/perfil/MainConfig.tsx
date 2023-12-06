'use client'

import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Eye, EyeOff, PenSquare, User2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { MediaPickerProfile } from './MediaPickerProfile'
import { getUserJS } from '@/lib/authGithub'
import Link from 'next/link'

interface User {
  id: string
  username: string
  college: string
  github: string
  lattes: string
  linkedin: string
  profilePictures: string
  email: string
}

const createUserFormSchema = z.object({
  email: z.string(),
  linkedin: z.string(),
  github: z.string(),
  lattes: z.string(),
  username: z.string(),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export function MainConfig() {
  const [UserSub, setUserSub] = useState('')
  const { by } = useParams()

  const routes = useRouter()

  // get User
  const [userData, setUserData] = useState<User | null>(null)

  // pictureHover
  const [isHovered, setIsHovered] = useState(false)

  // media Picker
  const [preview, setPreview] = useState<string | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)

  const jwtInFo = getUserJS()

  if (!preview && jwtInFo) {
    const { profilePictures } = jwtInFo
    // console.log(profilePictures)
    setPreview(profilePictures)
  }

  // hookConfig
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  // get User
  const fetchData = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      setUserSub(sub)
    }

    try {
      const response = await api.get(`/perfil/${by}`)

      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [by])

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

  // send DB
  async function UpdateUser(data: any) {
    const email = data.email
      ? data.email
      : userData?.email
      ? userData?.email
      : 'Não possui Email cadastrado'
    const username = data.username
      ? data.username
      : userData?.username
      ? userData?.username
      : 'Não possui Username cadastrado'
    const linkedin = data.linkedin
      ? data.linkedin
      : userData?.linkedin
      ? userData?.linkedin
      : 'Não possui Linkedin cadastrado'
    const github = data.github
      ? data.github
      : userData?.github
      ? userData?.github
      : 'Não possui Github cadastrado'
    const lattes = data.lattes
      ? data.lattes
      : userData?.lattes
      ? userData?.lattes
      : 'Não possui Lattes cadastrado'

    if (preview && files) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', files[0])

      // console.log(files)
      // console.log(preview)

      const uploadResponse = await api.post('/uploads', uploadFormData)

      const coverUrl = uploadResponse.data.fileUrl
      // console.log(coverUrl)

      try {
        // console.log(coverUrl)

        const response = await api.put(`/perfil/${by}`, {
          email: email,
          username: username,
          linkedin: linkedin,
          github: github,
          lattes: lattes,
          profilePictures: coverUrl,
        })

        const token = response.data.token

        Cookies.set('token', token, { path: '/', expires: 30 })
        routes.push('/')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await api.put(`/perfil/${by}`, {
          email: email,
          username: username,
          linkedin: linkedin,
          github: github,
          lattes: lattes,
          profilePictures: preview,
        })
        const token = response.data.token
        Cookies.set('token', token, { path: '/', expires: 30 })
        routes.push('/')
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
          onSubmit={handleSubmit(UpdateUser)}
          className='mx-2 p-3 grid gap-5 grid-cols-1 justify-between items-center place-items-start leading-relaxed'>
          <div className='mx-2 p-3 flex justify-between items-center place-items-start leading-relaxed'>
            <div
              className='w-[90px] md:w-24 ml-2 justify-center items-center place-items-center flex rounded-full bg-white-200 overflow-hidden aspect-square object-cover'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <Image
                src={preview ? preview : userData.profilePictures}
                alt=''
                width={128}
                height={128}
                className={`cursor-pointer ${
                  isHovered
                    ? 'filter blur transition-all ease-in-out duration-100'
                    : ''
                }`}
              />
              {isHovered && (
                <div className='w-6 h-6 absolute bg-gray-400 rounded-full flex justify-center items-center'>
                  <label htmlFor='getPicture'>
                    <PenSquare className='w-[14px] cursor-pointer text-orange-500' />
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

            <PenSquare className='md:hidden w-6 ml-4 cursor-pointer text-orange-500' />

            <div className='ml-4 relative w-full'>
              <input
                type='text'
                placeholder={
                  userData.username
                    ? userData.username
                    : 'Não possui nome de usuário'
                }
                {...register('username')}
                name='username'
                className='w-full p-[3px] pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-1'
              />
              <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
                {errors.username && <span>{errors.username.message}</span>}
              </p>
            </div>
          </div>

          <div className='relative w-full'>
            <input
              type='email'
              placeholder={
                userData.email ? userData.email : 'Não possui Email cadastrado'
              }
              {...register('email')}
              name='email'
              className='w-full p-[3px] pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-1'
            />
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.email && <span>{errors.email.message}</span>}
            </p>
          </div>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder={
                userData.linkedin
                  ? userData.linkedin
                  : 'Não possui Linkedin cadastrado'
              }
              {...register('linkedin')}
              name='linkedin'
              className='w-full p-[3px] pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-1'
            />
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.linkedin && <span>{errors.linkedin.message}</span>}
            </p>
          </div>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder={
                userData.github
                  ? userData.github
                  : 'Não possui Github cadastrado'
              }
              {...register('github')}
              name='github'
              className='w-full p-[3px] pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-1'
            />
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.github && <span>{errors.github.message}</span>}
            </p>
          </div>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder={
                userData.lattes
                  ? userData.lattes
                  : 'Não possui currículo Lattes cadastrado'
              }
              {...register('lattes')}
              name='lattes'
              className='w-full p-[3px] pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-1'
            />
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.lattes && <span>{errors.lattes.message}</span>}
            </p>
          </div>
          <div className='w-full p-[3px] rounded-3xl bg-gray-800 text-orange-500'>
            <Link href={`/config/${UserSub}/senha`}>
              <p className='ml-2'>Atualizar Senha</p>
            </Link>
          </div>

          <div className='w-full p-[3px] rounded-3xl bg-gray-800 text-orange-500'>
            <p
              className='ml-2 cursor-pointer'
              onClick={() => {
                setDelete(!Delete)
              }}>
              Deletar Conta
            </p>
          </div>

          {Delete ? (
            <div className='absolute w-[25vw] h-[35vh] top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-400 flex flex-col justify-center items-center gap-8'>
              <div className=''>Certeza que Deseja Excluir sua Conta?</div>

              <div className='gap-4 flex items-center justify-center place-items-center'>
                <div
                  className='w-24 h-10 mt-5 mb-1 rounded-full bg-orange-500 hover:bg-orange-900 flex justify-center items-center cursor-pointer'
                  onClick={DeleteAccount}>
                  Confirmar
                </div>

                <button
                  className='w-24 h-10 mt-5 mb-1 rounded-full bg-orange-500 hover:bg-orange-900'
                  onClick={() => {
                    setDelete(!Delete)
                  }}>
                  Fechar
                </button>
              </div>
            </div>
          ) : null}

          <div className='flex items-center justify-center place-items-center'>
            <button
              className='w-32 h-14 mt-5 mb-1 text-lg rounded-full bg-orange-500'
              type='submit'>
              Confirmar
            </button>
          </div>
        </form>
      ) : null}
    </>
  )
}
