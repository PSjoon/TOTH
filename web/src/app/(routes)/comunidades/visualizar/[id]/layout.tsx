import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { OptionsProfile } from '@/components/geral/profile/OptionsProfile'
import { OptionsCommunity } from '@/components/geral/comunidades/complete/OptionsCommunity'
import { Community } from '@/components/geral/comunidades/complete/Community'
import { MainCommunit } from '@/components/geral/comunidades/complete/MainCommunity'
import { CommentComu } from '@/components/geral/comunidades/complete/CommentComu'

export const metadata: Metadata = {
  title: 'Bem-Vindo',
  description: 'Profile Page',
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
          <div className='w-full h-16 hidden fixed md:flex bg-gray-800 border-b-2 border-orange-500 z-10'>
            <HeaderTablet />
          </div>
          <div className='md:hidden lg:hidden'>
            <Header />
          </div>
        </header>

        <main className='grid lg:grid-cols-[1fr_8fr_1fr] md:grid-cols-[1fr_6fr_1fr] min-h-screen '>
          <section className=''>{children}</section>
          <div>
            <div className='md:my-[76px] mt-4'>
              {/* <OptionsCommunity /> */}
              <Community />
            </div>

            <div className=' md:-mt-12 mb-20 md:mb-0'>
              <MainCommunit />
            </div>

            <footer className='md:hidden lg:hidden'>
              <Footer />
            </footer>
          </div>
        </main>
      </body>
    </html>
  )
}
