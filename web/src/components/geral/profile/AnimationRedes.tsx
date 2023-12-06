import { useEffect, useState } from 'react'
import Github from 'public/iconsProfile/icon-github.svg'
import Linkedin from 'public/iconsProfile/icon-linkedin.svg'
import Lattes from 'public/iconsProfile/icon-lattes.svg'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { icons } from 'lucide-react'

export function AnimationRedes(redes: any) {
  const [activeIcon, setActiveIcon] = useState(null)

  const redesUser = redes.redes

  const handleMouseOver = (iconNumber: any) => {
    setActiveIcon(iconNumber)
  }
  const handleMouseLeave = () => {
    setActiveIcon(null)
  }

  const icons = [
    {
      id: 1,
      icon: (
        <>
          {redesUser[0] != 'Não possui Github cadastrado' ? (
            <Link href={redesUser[0]} target='_blank'>
              <Image
                src={Github}
                alt='Github_icon'
                className='w-[28px] md:w-8'
              />
            </Link>
          ) : (
            <Image
              src={Github}
              alt='Github_icon'
              className='w-[28px] md:w-8 opacity-40 cursor-not-allowed'
            />
          )}
        </>
      ),
    },
    {
      id: 2,
      icon: (
        <>
          {redesUser[1] != 'Não possui Linkedin cadastrado' ? (
            <Link href={redesUser[1]} target='_blank'>
              <Image
                src={Linkedin}
                alt='Linkedin_icon'
                className='w-8 md:w-9'
              />
            </Link>
          ) : (
            <Image
              src={Linkedin}
              alt='Github_icon'
              className='w-8 md:w-9 opacity-40 cursor-not-allowed'
            />
          )}
        </>
      ),
    },
    {
      id: 3,
      icon: (
        <>
          {redesUser[2] != 'Não possui Lattes cadastrado' ? (
            <Link href={redesUser[2]} target='_blank'>
              <Image src={Lattes} alt='lattes_icon' className='w-8 md:w-10' />
            </Link>
          ) : (
            <Image
              src={Lattes}
              alt='Github_icon'
              className='w-8 md:w-10 opacity-40 cursor-not-allowed'
            />
          )}
        </>
      ),
    },
  ]
  return (
    <div className='flex relative' onMouseLeave={handleMouseLeave}>
      {icons.map((item) => (
        <div
          key={item.id}
          className='relative cursor-pointer'
          onMouseOver={() => handleMouseOver(item.id)}
          style={{ marginRight: '24px' }}>
          {item.icon}

          <Transition
            show={activeIcon === item.id}
            enter='transition-all ease-in-out duration-500 delay-[150ms]'
            enterFrom='opacity-0 '
            enterTo='opacity-80'
            leave='transition-all ease-in-out duration-500'
            leaveFrom='opacity-80'
            leaveTo='opacity-0'>
            {(ref) => (
              <div
                ref={ref}
                className='absolute w-full h-0.5 px-[26px] -ml-2 bg-orange-500 bottom-0'></div>
            )}
          </Transition>
        </div>
      ))}
    </div>
  )
}
