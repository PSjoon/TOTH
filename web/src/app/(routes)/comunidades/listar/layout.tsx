import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { Main } from '@/components/geral/main/Main'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { OptionsProfile } from '@/components/geral/profile/OptionsProfile'
import { ArtigoPage } from '@/components/geral/main/ArtigoPage'
import { ArtigoComment } from '@/components/geral/main/ArtigoComment'
import { MainComu } from '@/components/geral/comunidades/home/MainComu'
import { ShowShortComu } from '@/components/geral/comunidades/home/ShowShortComu'
import { ListarComu } from '@/components/geral/comunidades/home/ListarComu'

export const metadata: Metadata = {
  title: 'Criar Artigo',
  description: 'Artigo Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${nunito.variable} font-sans bg-gray-600 text-white-200 overflow-y-hidden`}>
        <header>
          <div className='w-full h-16 hidden fixed md:flex bg-gray-800 border-b-2 border-orange-500'>
            <HeaderTablet />
          </div>
          <div className='md:hidden lg:hidden mb-4'>
            <Header />
          </div>
        </header>

        <main className='grid min-h-screen '>
          <div className='md:block md:mt-[80px]'>
            <section className='hidden lg:flex'>{children}</section>
            <ListarComu />
          </div>
        </main>

        <footer>
          <div className='md:hidden lg:hidden'>
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  )
}
