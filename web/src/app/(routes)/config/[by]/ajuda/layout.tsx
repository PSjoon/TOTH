import { nunito } from '@/app/(global)/layout'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import { MainHelp } from '@/components/geral/config/ajuda/MainHelp'
import { MainConfig } from '@/components/geral/config/notificacoes/MainConfig'
import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'

export const metadata = {
  title: 'Ajuda * Configurações',
  description: 'Ajuda Config',
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
          <div className='hidden fixed md:flex w-full h-16 bg-gray-800 border-b-2 border-orange-500 z-50'>
            <HeaderTablet />
          </div>
          <div className='md:hidden lg:hidden mb-4'>
            <Header />
          </div>
        </header>

        <main className='grid lg:grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr] min-h-screen '>
          {/* Left */}
          <div className='hidden md:flex lg:flex'>{children}</div>

          <div className='h-[270px] mx-2 md:mx-20 mb-10 md:mt-[120px] border-y-[1px] border-orange-500 text-white-200 bg-gray-200 rounded-3xl'>
            <MainHelp />
          </div>
        </main>

        <footer className='md:hidden lg:hidden'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
