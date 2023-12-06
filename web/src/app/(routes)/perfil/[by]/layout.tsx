import { Footer } from '@/components/mobile/home/footer/Footer'
import { Header } from '@/components/mobile/home/header/Header'
import { HeaderTablet } from '@/components/computer/home/header/HeaderTablet'
import type { Metadata } from 'next'
import { nunito } from '@/app/(global)/layout'
import { OptionsProfile } from '@/components/geral/profile/OptionsProfile'
import { useRouter } from 'next/router'
import { ProfileUser } from '@/components/geral/profile/ProfileUser'
import { useSearchParams } from 'next/navigation'
import { getUserJS } from '@/lib/authGithub'

export const metadata: Metadata = {
  title: 'Perfil',
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

        <main className='grid md:grid-cols-[8fr] min-h-screen '>
          <section className=''>{children}</section>
          <div>
            <div className='md:my-[74px] mt-4'>
              <ProfileUser />
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
