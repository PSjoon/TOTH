import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import { RightHome } from '@/components/computer/home/right/RightHome'

export const nunito = Nunito({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of TOTH',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${nunito.variable} font-sans bg-gray-600 text-white-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}>
        <header>
          <div className='hidden fixed md:flex w-full h-16 bg-gray-800 border-b-2 border-orange-500 z-50'>
            <HeaderTablet />
          </div>
          <div className='md:hidden lg:hidden'>
            <Header />
          </div>
        </header>

        <main className='grid lg:grid-cols-[5fr_2fr] md:grid-cols-[3fr_1fr] min-h-screen'>
          <div className=''>{children}</div>

          <div className='hidden lg:grid md:grid mt-[88px] mr-3 '>
            <RightHome />
          </div>
        </main>

        <footer className='md:hidden lg:hidden'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
