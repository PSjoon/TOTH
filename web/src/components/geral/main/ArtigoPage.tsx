'use client'

import { User2, Bookmark, MoreVertical, ArrowDownToLine } from 'lucide-react'
import downIcon from '/public/iconsPost/down.svg'
import shareIcon from '/public/iconsPost/share.svg'
import upIcon from '/public/iconsPost/up.svg'
import Image from 'next/image'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Link from 'next/link'
import { ArtigoText } from './ArtigoText'
import { OptionsPost } from './showPost/iconsState/OptionsPost'

export function ArtigoPage() {
  const [iconColor, setIconColor] = useState('#EFEFEF')
  const [fillIcon, setfillIcon] = useState('#EFEFEF')
  const [pointiconColor, setpointIconColor] = useState('#EFEFEF')
  const [pointfillIcon, setpointfillIcon] = useState('#EFEFEF')
  const [isVisible, setVisible] = useState(false)

  const handleIconClick = () => {
    setIconColor(iconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
    setfillIcon(fillIcon === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
  }

  const clickVisible = () => {
    setVisible(!isVisible)
    setpointIconColor(pointiconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
    setpointfillIcon(pointfillIcon === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
  }

  return (
    <main className='mx-2 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
      <header className='h-[10vh] lg:h-[14vh] flex items-center justify-between p-2'>
        <div className='p-2 mt-4 flex justify-center items-center'>
          <Link href={'/profile'}>
            <div className='w-16 ml-2 rounded-full bg-white-200 overflow-hidden'>
              <User2
                color='#040404'
                className='w-full h-full md:w-16 md:h-16 lg:w-16 lg:h-16'
              />
            </div>
          </Link>

          <div className='sm:text-sm md:text-lg ml-4'>
            <p>Pedro dos Santos Júnior</p>
            <p className='italic text-orange-500'>
              Engenharia da Computação - FIAP
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Bookmark
            size={30}
            color={iconColor}
            fill={fillIcon}
            onClick={handleIconClick}
            className='md:w-8 md:h-8 cursor-pointer'
          />
          <MoreVertical
            onClick={clickVisible}
            size={32}
            color={pointiconColor}
            fill={pointfillIcon}
            className='md:w-[34px] md:h-[34px] cursor-pointer'
          />

          <CSSTransition in={isVisible} timeout={100} unmountOnExit>
            <OptionsPost />
          </CSSTransition>
        </div>
      </header>
      <section className='px-3'>
        <ArtigoText />
      </section>

      <footer className='h-[7vh] mx-10 flex pb-6 items-center justify-between'>
        <div className='lg:w-[24%] md:w-[22%] w-[50%] grid grid-cols-4 gap-5'>
          <Image
            src={shareIcon}
            alt=''
            className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8'
          />

          <Image
            src={downIcon}
            alt=''
            className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8'
          />
          <Image
            src={upIcon}
            alt=''
            className='w-[26px] h-[26px] lg:w-[25px] lg:h-[25px] md:w-8 md:h-8'
          />
          <div className='h-6 w-32 flex justify-start px-3 items-center bg-gray-800 rounded-3xl cursor-pointer'>
            <p>Download</p>
            <ArrowDownToLine className='w-5 h-5 ml-2' />
          </div>
        </div>
        <div className='flex gap-3 mb-20'>
          <p className='opacity-20'>18/07/2023</p>
        </div>
      </footer>
    </main>
  )
}
