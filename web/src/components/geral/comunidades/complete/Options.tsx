'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export function Options() {
  const { id } = useParams()

  return (
    <div className='mx-2 p-3 grid gap-3 grid-cols-1 justify-between items-center place-items-start leading-relaxed'>
      <div className='w-full p-[3px] rounded-3xl bg-gray-800'>
        <Link href={`/comunidades/config/${id}`}>
          <p className='ml-2'>Configurações</p>
        </Link>
      </div>
    </div>
  )
}
