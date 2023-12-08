'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import Image from 'next/image'
import { OptionsPost } from '../showPost/iconsState/OptionsPost'
import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import { api } from '@/lib/api'
import { ISODateString } from 'next-auth'
import { useState, useEffect } from 'react'
import { RetornoSearch } from './RetornoSearch'
import { JustMoreVertical } from '../showPost/iconsState/JustMoreVertical'

interface Article {
  id: string
  title: string
  text: string
  dateCreated: ISODateString
}

export function ArticleSearch() {
  const [searchArticleState, setSearchArticle] = useState<Article[]>([])

  const fetchData = async () => {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const search = urlParams.searchParams.get('search')

    const response = await api.post(`/search/${search}`)

    const searchArticle: Article[] = response.data.artigo

    setSearchArticle(searchArticle)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {searchArticleState ? (
        searchArticleState.map((searchArticleState) => {
          return (
            <main className='mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
              <header className='h-[10vh] lg:h-[14vh] flex float-right items-center justify-between p-2'>
                <JustMoreVertical artigo={searchArticleState} />
              </header>

              <Link
                href={`/artigo/visualizar/${searchArticleState.id} `}
                title='Ver Artigo Completo'>
                <div className='h-auto mt-2 mx-3 mb-2 p-7 rounded-[25px] overflow-hidden cursor-pointer'>
                  <p className='text-orange-500 mb-4 ml-1 text-ellipsis line-clamp-1 text-lg'>
                    {searchArticleState.title}
                  </p>
                  <div
                    title='Ver Artigo Completo'
                    className='text-ellipsis line-clamp-4'
                    dangerouslySetInnerHTML={{
                      __html: searchArticleState.text,
                    }}
                  />
                </div>
              </Link>

              <footer className='h-[7vh] mx-10 flex pb-6 items-center justify-between'>
                <div className='flex gap-3 mb-10 cursor-default'>
                  <p className='opacity-20' title='Data de Criação'>
                    {dayjs(searchArticleState.dateCreated).format('DD/MM/YYYY')}
                  </p>
                </div>
              </footer>
            </main>
          )
        })
      ) : (
        <RetornoSearch />
      )}
    </>
  )
}
