import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/iconsGeneral/logo.svg'

export function HomeGeral() {
  return (
    <>
      <div className='mx-2 lg:mx-[20%] md:my-4 my-10 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 md:mt-[88px] flex items-center justify-center'>
        <div className='text-center leading-relaxed md:my-4 grid grid-flow-row grid-cols-1 md:gap-16 gap-6'>
          <p className='text text-orange-500 text-lg'>Frase de efeito</p>

          <p className='md:mx-10 mx-4 text-justify'>
            Consequat in culpa nostrud enim minim mollit ullamco do ex eiusmod
            esse laboris esse. Exercitation cillum excepteur aute tempor
            adipisicing aliqua aute. Cillum aliquip labore elit adipisicing esse
            tempor aute sit amet quis adipisicing veniam ipsum anim. Consequat
            in culpa nostrud enim minim mollit ullamco do ex eiusmod esse
            laboris esse. Exercitation cillum excepteur aute tempor adipisicing
            aliqua aute. Cillum aliquip labore elit adipisicing esse tempor aute
            sit amet quis adipisicing veniam ipsum anim.
          </p>

          <Link href={'/'}>
            <div className='flex justify-center items-center'>
              <p className='hover:underline hover:bg-orange-900 bg-orange-500 rounded-md p-2'>
                Conheça o TOTH
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className='mx-2 h-96 lg:mx-[8%] md:my-4 my-10 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 md:mt-[88px] flex items-center justify-center'></div>

      <footer className='w-full text-gray-500 bg-gray-800 text-opacity-80'>
        <div className='grid md:grid-cols-3 grid-cols-2 grid-flow-col gap-10 md:mx-20 mx-4 text-sm my-8 justify-center items-center leading-relaxed'>
          <div className='flex flex-col gap-6'>
            <p className='text-orange-500'>Sobre TOTH:</p>
            <p>Políticas de Privacidade</p>
            <p>Quem somos?</p>
            <p>Sobre o Projeto TOTH</p>
          </div>
          <div className='flex flex-col gap-6'>
            <p className='text-orange-500'>Nossas Redes:</p>
            <p>Equipe</p>
            <p>Email</p>
            <p>Github</p>
          </div>
          <div className='hidden md:block'>
            <Image
              src={logo}
              alt='Voltar a Página'
              className='w-20'
              title='Página Inicial'
            />
            <p>Slogan</p>
          </div>
        </div>
      </footer>
    </>
  )
}
