import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { ArtigoCreate } from '@/components/geral/artigo/criar/ArtigoCreate'
import { RightHome } from '@/components/computer/home/right/RightHome'

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
        className={`${nunito.variable} font-sans bg-gray-600 text-white-200`}>
        <header>
          <div className='hidden w-full h-16 fixed md:flex bg-gray-800 border-b-2 border-orange-500 z-50'>
            <HeaderTablet />
          </div>
          <div className='md:hidden lg:hidden mb-4'>
            <Header />
          </div>
        </header>

        <main className='grid lg:grid-cols-[5fr_2fr] md:grid-cols-[3fr_1fr] min-h-screen'>
          <div className='mx-2'>{children}</div>

          <div className='hidden lg:grid md:grid mt-[88px] mr-3 '>
            <RightHome />
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
