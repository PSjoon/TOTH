'use client'

import { CircleEllipsis } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export function OptionsCommunity() {
  const { id } = useParams()

  return (
    <>
      <div className='flex -mt-0.5 -ml-2.5 justify-between items-center'>
        <Link href={`/comunidades/config/${id}`}>
          <span title='Configurações'>
            <CircleEllipsis
              className='w-[26px] h-[26px] md:w-[28px] md:h-[28px] cursor-pointer'
              color={'#EFEFEF'}
            />
          </span>
        </Link>
      </div>
    </>
  )
}
