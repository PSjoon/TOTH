import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export function GoogleLogin() {
  const { data: session } = useSession()
  const token = Cookies.get('token')
  const router = useRouter()

  // const urlParams = new URLSearchParams(window.location.search)
  // const mensagem = urlParams.get('Logado')

  if (typeof window !== 'undefined') {
    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const mensagem = urlParams.searchParams.get('Logado')

    if (mensagem) {
      GoogleSi()
    }
  }

  async function GoogleSi() {
    if (session && !token) {
      const userName = session?.user?.name
      const userEmail = session?.user?.email
      const userPictures = session?.user?.image

      const register = await api.post('/insertgoogle', {
        email: userEmail,
        name: userName,
        profilePictures: userPictures,
      })

      const token = register.data.token
      // console.log(token)
      // console.log('token')

      Cookies.set('token', token, { path: '/', expires: 30 })

      router.push('/')
    }
  }

  async function Handleclick() {
    await signIn('google', {
      callbackUrl: '/cadastrar?Logado=true',
    })
  }

  return (
    <div
      className='w-[300px] flex border border-white-300 rounded-3xl text-white-50 p-1 py-2 pl-4 font-normal leading-relaxed place-items-center cursor-pointer'
      onClick={Handleclick}>
      <button>
        <FcGoogle />
      </button>
      <p className='ml-5'>Continuar com o Google</p>
    </div>
  )
}
