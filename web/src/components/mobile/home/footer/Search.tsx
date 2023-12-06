'use client'

import Image from 'next/image'
import lupa from '/public/iconsGeneral/lupa.svg'

import { Footer } from './Footer'

export function Search() {
  return (
    <div>
      <Image src={lupa} alt='search_icon' width={30} height={30} />
    </div>
  )
}
