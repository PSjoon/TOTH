'use client'

import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { ImLinkedin2 } from 'react-icons/im'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import { GoogleLogin } from './google/GoogleLogin'
import { NextAuthProvider } from './google/providers'

export function ExternalLogin() {
  return (
    <IconContext.Provider value={{ size: '28px' }}>
      <div className='mx-4 grid gap-6 mt-4 grid-cols-1 justify-center items-center place-items-center'>
        <NextAuthProvider>
          <GoogleLogin />
        </NextAuthProvider>

        <Link
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}>
          <div className='w-[300px] flex border border-white-300 rounded-3xl text-white-50 p-1 py-2 pl-4 font-normal leading-relaxed place-items-center cursor-pointer'>
            <BsGithub />
            <p className='ml-5'>Continuar com o Github</p>
          </div>
        </Link>
        <Link
          href={`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&response_type=code&scope=${process.env.NEXT_PUBLIC_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}>
          <div className='w-[300px] flex border border-white-300 rounded-3xl text-white-50 p-1 py-2 pl-4 font-normal leading-relaxed place-items-center cursor-pointer'>
            <ImLinkedin2 />
            <p className='ml-5'>Continuar com o LinkedIn</p>
          </div>
        </Link>
      </div>
    </IconContext.Provider>
  )
}
