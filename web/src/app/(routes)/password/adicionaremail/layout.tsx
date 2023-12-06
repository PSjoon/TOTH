import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/iconsGeneral/logo.svg'
import { nunito } from '@/app/(global)/layout'
import { ExternalLogin } from '@/components/geral/cadastroLogin/ExternalLogin'
import { InsideCadastro } from '@/components/geral/cadastroLogin/InsideCadastro'
import { InsideLogin } from '@/components/geral/cadastroLogin/InsideLogin'
import { ForgotPassword } from '@/components/geral/cadastroLogin/ForgotPassword'
import { AddEmail } from '@/components/geral/cadastroLogin/AddEmail'

export const metadata = {
  title: 'Logar',
  description: 'Login Page',
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

          <div className='md:hidden flex justify-center items-center'>
            <Image alt='Logo' src={logo} />
          </div>

          <div className='flex flex-col items-center justify-center mx-2 mb-4 pt-5 lg:mt-4 lg:mx-12  rounded-3xl border-orange-500 border-y-[1.5px] bg-gray-200 '>
            <AddEmail />
          </div>
        </main>
      </body>
    </html>
  )
}
