import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { Main } from '@/components/geral/main/Main'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { OptionsProfile } from '@/components/geral/profile/OptionsProfile'
import { ArtigoPage } from '@/components/geral/main/ArtigoPage'
import { ArtigoComment } from '@/components/geral/main/ArtigoComment'
import { ShowArticle } from '@/components/geral/artigo/visualizar/ShowArticle'
import { Comment } from '@/components/geral/artigo/visualizar/Comment'
import { ListComment } from '@/components/geral/artigo/visualizar/listComment'

export const metadata: Metadata = {
  title: 'Visualizar Artigo',
  description: 'Artigo Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${nunito.variable} font-sans bg-gray-600 text-white-200`}>
      <header>
        <div className='w-full h-16 hidden fixed md:flex bg-gray-800 border-b-2 border-orange-500'>
          <HeaderTablet />
        </div>
        <div className='md:hidden lg:hidden mb-4'>
          <Header />
        </div>
      </header>

      <main className='grid min-h-screen'>
        {/* <section className='hidden md:hidden lg:flex'>{children}</section> */}

        <div className='md:mx-4 lg:ml-10 md:mt-[80px] '>
          <ShowArticle />
        </div>
      </main>

      <div className='md:mx-4 lg:ml-10 '>
        <Comment />
      </div>

      <div className='md:mx-4 lg:ml-10 -mb-4'>
        <ListComment />
      </div>

      <footer>
        <div className='md:hidden'>
          <Footer />
        </div>
      </footer>
    </div>
  )
}
