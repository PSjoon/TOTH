import { api } from '@/lib/api'
import { ISODateString } from 'next-auth'
import Link from 'next/link'

interface Artigo {
  id: string
  dateCreated: ISODateString
  photo: string
  reaction: number
  text: string
  title: string
  by: string
  profilePictures: string
  username: string
  college: string
  email: string
  scielo: string
  file: string
}

export async function Conteudo() {
  const response = await api.get('/artigo')
  const artigo: Artigo[] = response.data

  return (
    <>
      {artigo.map((artigo) => {
        return (
          <Link href={`/artigo/visualizar/${artigo.id} `}>
            <div className='w-[19vw] mb-2 lg:w-[19vw] h-auto p-3 rounded-[25px] border-l-[1px] border-orange-500 bg-gray-300'>
              <p className='text-orange-500 ml-1 text-ellipsis line-clamp-1 '>
                {artigo.title}
              </p>
              <div
                className='text-ellipsis line-clamp-4 '
                dangerouslySetInnerHTML={{ __html: artigo.text }}
              />
            </div>
          </Link>
        )
      })}
    </>
  )
}
