import { api } from '@/lib/api'
import { ISODateString } from 'next-auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  college: string
  email: string
  scielo: string
  file: string
}

export function SearchTop() {
  const [Article, setArticle] = useState<Artigo | null>(null)

  const fetchData = async () => {
    try {
      const response = await api.get('/artigo')
      setArticle(response.data.slice(0, 8))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {Article
        ? Article.map((artigo: any) => {
            return (
              <Link href={`/artigo/visualizar/${artigo.id} `}>
                <div className='w-full h-10 my-4 flex items-center justify-between bg-gray-700 rounded-full'>
                  <p className='text-lg text-orange-500 ml-3 truncate'>
                    {artigo.title}
                  </p>
                </div>
              </Link>
            )
          })
        : null}
    </>
  )
}
