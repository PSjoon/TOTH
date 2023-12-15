'use client'

import { api } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { OptionsCommunity } from './OptionsCommunity'
import { Main } from '../../main/Main'
import { MainCommunit } from './MainCommunity'
import iconCreate from '/public/iconsGeneral/create-on.svg'
import iconCreateHover from '/public/iconsGeneral/create.svg'
import { getUserJS } from '@/lib/authGithub'
import { PlusCircle } from 'lucide-react'
import { fetchData } from 'next-auth/client/_utils'

interface CommunityInter {
  id: string
  comuName: string
  description: string
  isPublic: boolean
  photo: string
  by: string
}

interface User {
  id: string
  college: string
  profilePictures: string
  username: string
}

export function Community() {
  const [DataCommunity, setData] = useState<CommunityInter | null>(null)
  const [DataUser, setDataUser] = useState<User | null>(null)
  const [hoveredCreate, setHoveredCreate] = useState(false)
  const [Create, setCreate] = useState(false)
  const [jwtPicture, setJwtPicture] = useState('')
  const [jwtUsername, setJwtUsername] = useState('')
  const [text, setText] = useState('')
  const [Descript, setDescript] = useState('')
  const [IdLogUser, setIdLogUser] = useState('')
  const { id } = useParams()

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    setDescript(inputValue)

    if (inputValue.length <= 200) {
      setText(inputValue)
    }
  }

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const communityId = id
    const by = DataUser?.id
    const message = Descript

    console.log(Descript)

    try {
      const response = await api.post(`/post/${communityId}`, {
        by,
        message,
      })

      if (response) {
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const jwtInFo = getUserJS()

  const fetchData = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      setIdLogUser(sub)
      const { profilePictures } = jwtInFo
      const { username } = jwtInFo
      const { nickname } = jwtInFo
      if (username) {
        setJwtUsername(username)
      } else {
        setJwtUsername(nickname)
      }

      setJwtPicture(profilePictures)
    }

    try {
      const response = await api.get(`/comunidade/${id}`)

      const responseUser = await api.get(`/perfil/${response.data.by}`)

      setData(response.data)
      setDataUser(responseUser.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const routes = useRouter()

  const [iconColor, setIconColor] = useState('#EFEFEF')

  const getfollow = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo

      const userFollows = await api.post(`userCommunityCheck/${id}`, {
        sub,
      })

      if (userFollows.data.includes(id)) {
        setIconColor(iconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
      }
    }
  }

  const handleIconClick = async () => {
    setIconColor(iconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')

    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.post(`/follwoComu/${id}`, {
        sub,
      })
    }
  }

  useEffect(() => {
    if (!jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }
    fetchData()
    getfollow()
  }, [id])

  return (
    <>
      {Create ? (
        <div className='fixed w-[390px] h-72 ml-[25vw] -mt-20 z-50 p-4 mb-4 border-x-[1px] border-y-[1px] rounded-b-3xl border-orange-500 text-white-200 bg-gray-400'>
          <form action='' onSubmit={submitPost}>
            <div className='flex items-center'>
              <div
                className='w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] lg:h-[4vw] lg:w-[4vw] ml-2 rounded-full overflow-hidden'
                title='Acessar Perfis'>
                <Image
                  src={jwtPicture}
                  alt='Foto do Usuário'
                  width={128}
                  height={128}
                />
              </div>
              <p className=' text-white-50 ml-2 '>{jwtUsername}</p>
            </div>

            <div className='form-group mt-4'>
              <textarea
                className='w-full h-28 form-control rounded-lg resize-none border border-orange-500 p-2 text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200 '
                name='post'
                id='post'
                onChange={handleChange}
                maxLength={200}
                placeholder='Digite sua postagem...'
              />

              <p className='opacity-60 cursor-default '>
                {200 - text.length}/{200}
              </p>
            </div>
            <div className='flex items-center justify-center'>
              <button
                className='hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
                type='submit'>
                Enviar!
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {DataCommunity && DataUser ? (
        <div
          key={DataCommunity.id}
          className='p-4 mb-4 mx-2 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
          {DataCommunity.photo ? (
            <div className='mx-2 opacity-30'>
              <Image
                src={DataCommunity.photo}
                alt=''
                width={500}
                height={500}
                className='h-20 md:h-28 w-full aspect-video rounded-xl object-cover'
              />
            </div>
          ) : null}
          <div className='flex gap-8'>
            <p
              className='ml-2 my-2 italic text-orange-500 text-lg '
              title='Nome Comunidade'>
              {DataCommunity.comuName}
            </p>
            <div
              className='group'
              onMouseEnter={() => setHoveredCreate(true)}
              onMouseLeave={() => setHoveredCreate(false)}
              onClick={() => {
                setCreate(!Create)
              }}>
              <Image
                src={hoveredCreate ? iconCreate : iconCreateHover}
                alt='criarPostagem'
                className='w-5 mt-2 cursor-pointer transition-transform duration-300 transform group-hover:scale-110'
                title='Criar Postagem'
              />
            </div>
            <div className='flex -ml-2 mt-2 cursor-pointer'>
              <PlusCircle onClick={handleIconClick} color={iconColor} />
            </div>
            {IdLogUser == DataCommunity?.by ? <OptionsCommunity /> : null}
          </div>

          <div className='flex items-center gap-4'>
            <Link href={`/perfil/${DataUser.id}`}>
              <div
                className='w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] lg:h-[4vw] lg:w-[4vw] ml-2 rounded-full overflow-hidden'
                title='Acessar Perfis'>
                <Image
                  src={DataUser.profilePictures}
                  alt='Foto do Usuário'
                  width={128}
                  height={128}
                />
              </div>
            </Link>

            <Link href={`/perfil/${DataUser.id}`}>
              <div className='text-orange-500 leading-relaxed'>
                Administrador:
                <p className=' text-white-50 ml-2 '>{DataUser.username}</p>
              </div>
            </Link>
            <div className='h-24 w-44 lg:ml-[50vw] md:ml-[40vw] ml-[30vw] rounded-lg border border-orange-500 p-2 text-sm break-words'>
              {DataCommunity.description}
            </div>
          </div>
        </div>
      ) : null}

      {/* <MainCommunit /> */}
    </>
  )
}
