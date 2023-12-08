import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/iconsGeneral/logo-ramo.svg'

export function HomeGeral() {
  return (
    <>
      <div className='mx-2 lg:mx-[20%] md:my-4 my-10 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 md:mt-[88px] flex items-center justify-center'>
        <div className='text-center leading-relaxed md:my-4 flex flex-col justify-center items-center md:gap-16 gap-6 '>
          <div className='flex flex-col justify-center items-center gap-4'>
            <Image
              src={logo}
              alt='Voltar a Página'
              className='w-[70px]'
              title='Página Inicial'
            />
            <p className='text text-orange-500 text-lg'>
              Democratizando o acesso à informação de qualidade
            </p>
          </div>

          <p className='md:mx-10 mx-4 text-justify'>
            A produção científica e os debates acadêmicos são tradicionalmente
            vistos como atividades sérias e complexas, restritas a um público
            específico e distante do cotidiano da maioria das pessoas. No
            entanto, a disseminação do conhecimento científico e o acesso à
            informação são cada vez mais essenciais para a sociedade atual. Com
            o intuito de romper com essa visão restritiva e promover a
            democratização do conhecimento, surge então a plataforma Toth.
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

      <div className='mx-2 h-96 lg:mx-[8%] md:my-4 my-10 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200  flex justify-center'>
        <div className='flex justify-between gap-32'>
          <div className=' flex flex-col justify-center text-justify items-center my-4'>
            <p>Mariana Ferreira</p>
            <p
              className='text-orange-500
            '>
              Co-Fundador TOTH
            </p>
            <div className='h-full w-52 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 md:mt-[88px] flex justify-center'></div>
          </div>

          <div className=' flex flex-col justify-center text-justify items-center my-4'>
            <p>Nicole Soares</p>
            <p
              className='text-orange-500
            '>
              Co-Fundador TOTH
            </p>
            <div className='h-full w-52 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 md:mt-[88px] flex justify-center'></div>
          </div>

          <div className=' flex flex-col justify-center text-justify items-center my-4'>
            <p>Pedro dos Santos</p>
            <p
              className='text-orange-500
            '>
              Co-Fundador TOTH
            </p>
            <div className='h-full w-52 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 md:mt-[88px] flex justify-center'></div>
          </div>
        </div>
      </div>

      <footer className='w-full text-gray-500 bg-gray-800 text-opacity-80 mt-10'>
        <div className='grid md:grid-cols-3 grid-cols-2 grid-flow-col gap-10 md:mx-20 mx-4 text-sm my-8 justify-center items-center leading-relaxed'>
          <div className='flex flex-col gap-6'>
            <p className='text-orange-500'>Sobre TOTH:</p>
            <p>Políticas de Privacidade</p>
            <p>Sobre o Projeto TOTH</p>
          </div>

          <div className='flex flex-col gap-6'>
            <p className='text-orange-500'>Nossas Redes:</p>
            <Link href={'malito:pedrosantos.joon@gmail.com'}>
              <p>Email</p>
            </Link>

            <Link href={'https://github.com/PSjoon/TOTH'}>
              <p>Github</p>
            </Link>
          </div>
          <div className='hidden md:block'>
            <Image
              src={logo}
              alt='Voltar a Página'
              className='w-10'
              title='Página Inicial'
            />
            <div className='mt-2'>
              Democratizando o acesso <p>à informação de qualidade</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
