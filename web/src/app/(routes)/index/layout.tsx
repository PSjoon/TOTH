import { Header } from '@/components/mobile/home/header/Header'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { HomeGeral } from '@/components/geral/home/HomeGeral'
import { HomeHeaderTablet } from '@/components/geral/home/HomeHeaderTablet'

export const metadata: Metadata = {
  title: 'Bem-Vindo ao TOTH',
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
            <HomeHeaderTablet />
          </div>
          <div className='md:hidden lg:hidden'>
            <Header />
          </div>
        </header>

        <main className='grid md:grid-cols-[8fr] min-h-screen'>
          <HomeGeral />
        </main>
      </body>
    </html>
  )
}
