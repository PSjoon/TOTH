'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export function ConfigLeft() {
  const { by } = useParams()

  return (
    <div className='mx-2 p-3 grid gap-4 grid-cols-1 justify-between items-center place-items-start leading-relaxed'>
      <div className='w-full p-[3px] rounded-3xl bg-gray-800 cursor-pointer'>
        <Link href={`/config/${by}/perfil/`}>
          <p className='ml-2'>Perfil</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl text-orange-500 bg-gray-800 cursor-pointer'>
        <Link href={`/config/${by}/faculdades`}>
          <p className='ml-2'>Faculdades</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl bg-gray-800 cursor-pointer'>
        <Link href={`/config/${by}/notificacoes`}>
          <p className='ml-2'>Notificações</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl bg-gray-800 cursor-pointer'>
        <Link href={`/config/${by}/seguidores`}>
          <p className='ml-2'>Seguindos</p>
        </Link>
      </div>

      <div className='w-full p-[3px] rounded-3xl bg-gray-800 cursor-pointer'>
        <Link href={`/config/${by}/ajuda`}>
          <p className='ml-2'>Ajuda</p>
        </Link>
      </div>
    </div>
  )
}
