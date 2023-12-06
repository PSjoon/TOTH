import Link from 'next/link'
import logo from '/public/iconsGeneral/logo.svg'
import Image from 'next/image'

export function Header() {
  return (
    <header className='flex -mb-4 items-center justify-center cursor-pointer'>
      <Link href={'/'}>
        <Image src={logo} alt='Logo_TOTH' className='w-[40vw] h-[10vh]' />
      </Link>
    </header>
  )
}
