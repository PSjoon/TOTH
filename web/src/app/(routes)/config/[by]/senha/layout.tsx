import { nunito } from '@/app/(global)/layout'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import { AlterPassword } from '@/components/geral/config/perfil/AlterPassword'
import { MainConfig } from '@/components/geral/config/perfil/MainConfig'
import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'

export const metadata = {
  title: 'Redefinir Senha* Configurações',
  description: 'Perfil Config',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${nunito.variable} font-sans bg-gray-600 text-white-200 lg:overflow-y-hidden`}>
        <header>
          <div className='hidden fixed md:flex w-full h-16 bg-gray-800 border-b-2 border-orange-500 z-50'>
            <HeaderTablet />
          </div>
          <div className='md:hidden lg:hidden mb-4'>
            <Header />
          </div>
        </header>

        <main className='grid lg:grid-cols-[1fr] md:grid-cols-[1fr_3fr] min-h-screen'>
          {/* <div className='hidden md:flex lg:flex'>{children}</div> */}

          <div className='h-[80vh] md:h-auto mx-2 md:mx-20 mb-10 md:mt-20 border-y-[1px] border-orange-500 text-white-200 bg-gray-200 rounded-3xl flex justify-center items-center'>
            <AlterPassword />
          </div>
        </main>
        <footer className='md:hidden lg:hidden'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
