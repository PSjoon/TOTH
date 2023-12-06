'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export function Options() {
  const { by } = useParams()

  return (
    <div className='mx-2 p-3 grid gap-3 grid-cols-1 justify-between items-center place-items-start leading-relaxed'>
      <div className='w-full p-[3px] rounded-3xl bg-gray-800'>
        <Link href={`/config/${by}/perfil/`}>
          <p className='ml-2'>Perfil</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl text-orange-500 bg-gray-800'>
        <Link href={`/config/${by}/faculdades`}>
          <p className='ml-2'>Faculdades</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl bg-gray-800'>
        <Link href={`/config/${by}/notificacoes`}>
          <p className='ml-2'>Notificações</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl bg-gray-800'>
        <Link href={`/config/${by}/seguidores`}>
          <p className='ml-2'>Seguidores</p>
        </Link>
      </div>

      {/* <div className='lg:hidden w-full p-[3px] rounded-3xl bg-gray-800'>
        <Link href={`/config/${by}/salvos`}>
          <p className='ml-2'>Salvos</p>
        </Link>
      </div> */}

      <div className='w-full p-[3px] rounded-3xl bg-gray-800'>
        <Link href={`/config/${by}/ajuda`}>
          <p className='ml-2'>Ajuda</p>
        </Link>
      </div>
    </div>
  )
}
