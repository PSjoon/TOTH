import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { ArtigoCreate } from '@/components/geral/artigo/criar/ArtigoCreate'

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

        <main className='grid lg:grid-cols-[1fr_8fr_1fr] min-h-screen mb-28 md:mb-5 lg:mb-5'>
          <section className='hidden md:hidden lg:flex'>{children}</section>

          <div className='md:mx-4 lg:ml-10 md:mt-[80px]'>
            <ArtigoCreate />
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
