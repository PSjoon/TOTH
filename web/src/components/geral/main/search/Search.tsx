'use client'

import { UserSearch } from './UserSearch'
import { ArticleSearch } from './ArticleSearch'
import { CommunitySearch } from './CommunitySearch'
import { useState } from 'react'
import { getUserJS } from '@/lib/authGithub'
import { useRouter } from 'next/navigation'

export function Search() {
  const [selectedOption, setSelectedOption] = useState('usuarios')

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  const routes = useRouter()

  const jwtInFo = getUserJS()

  if (!jwtInFo) {
    routes.push('/cadastrar?error=UserLoggedRequire')
  }

  return (
    <>
      <select
        id='selectOption'
        value={selectedOption}
        onChange={handleOptionChange}
        className='h-full w-60 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
        title='Filtragens'>
        <option value='usuarios'>Usuários</option>
        <option value='artigos'>Artigos</option>
        <option value='comunidades'>Comunidades</option>
      </select>

      {selectedOption == 'usuarios' ? (
        <UserSearch />
      ) : selectedOption == 'artigos' ? (
        <ArticleSearch />
      ) : selectedOption == 'comunidades' ? (
        <CommunitySearch />
      ) : null}
    </>
  )
}
