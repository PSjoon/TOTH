import { nunito } from '@/app/(global)/layout'
import { ExternalLogin } from '@/components/geral/cadastroLogin/ExternalLogin'
import { InsideCadastro } from '@/components/geral/cadastroLogin/InsideCadastro'
import Image from 'next/image'
import logo from '/public/iconsGeneral/logo.svg'
import { getUserJS } from '@/lib/authGithub'
import { useRouter } from 'next/router'

export const metadata = {
  title: 'Cadastre-se',
  description: 'Cadastro Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${nunito.variable} font-sans bg-gray-600 text-black `}>
        <main className='grid lg:grid-cols-[2fr_2fr] md:grid-cols-[2fr_2fr] min-h-screen '>
          <section className='hidden md:flex lg:flex justify-center'>
            {children}
          </section>

          <div className='md:hidden flex justify-center items-center py-5'>
            <Image alt='Logo' src={logo} />
          </div>

          <div className='flex flex-col items-center justify-center mx-2 mb-4 pt-5 md:mt-4 lg:mx-12 rounded-3xl border-orange-500 border-y-[1.5px] bg-gray-200 '>
            <div className='w-[80%]'>
              <ExternalLogin />
            </div>

            <div className='w-[50%] md:w-[30%]  my-10 border-[1px] border-solid border-orange-500 opacity-80'></div>

            <div className='w-[80%]'>
              <InsideCadastro />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
