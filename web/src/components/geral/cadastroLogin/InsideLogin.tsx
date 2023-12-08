'use client'

import { EyeOff, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { getUserJS } from '@/lib/authGithub'

const createLoginFormsSchema = z.object({
  email: z
    .string()
    .email('Email Invalido')
    .min(1, 'Campo Obrigatorio')
    .toLowerCase(),
  password: z.string().min(1, 'Campo Obrigatorio'),
})

type createLoginFormsSchema = z.infer<typeof createLoginFormsSchema>

export function InsideLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // hookConfig
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createLoginFormsSchema>({
    resolver: zodResolver(createLoginFormsSchema),
  })

  const routes = useRouter()

  const jwtInFo = getUserJS()

  if (jwtInFo) {
    routes.push('/?error=userLogged')
  }

  async function loginUser(data: any) {
    try {
      const response = await api.post('/logar', {
        email: data.email,
        password: data.password,
      })

      console.log(response)

      const token = response.data.token
      const user = response.data.user

      Cookies.set('token', token, { path: '/', expires: 30 })

      const username = user.username
      const email = user.email

      const templateParams = {
        to_name: username,
        to_email: email,
        from_name: 'TOTH',
        message: 'nada',
        email: 'pedro@example.com',
      }

      if (response) {
        emailjs
          .send(
            'service_u24drvw', // service id
            'template_yf7kb3o', // template id
            templateParams,
            'yhTgVWC_02Tj3kuUM',
          )
          .then(
            () => {
              console.log('enviado')
            },
            (err) => {
              console.log('error', err)
            },
          )
      }

      routes.push('/')
    } catch (error) {
      window.location.search = 'error=userNotExisted'
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-sm rounded-2xl text-white-50'>
        <form
          className='px-8 pt-f0 pb-8 mb-4 grid gap-6 grid-cols-1 place-items-center'
          onSubmit={handleSubmit(loginUser)}>
          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px]'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                {...register('email')}
              />
              <label
                className='flex h-full w-full absolute pointer-events-none left-0 -top-4 text-[11px] font-normal leading-tight before:pointer-events-none before:mr-1 before:w-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.5] transition-all peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 text-gray-50
                '>
                <p>@Email</p>
              </label>
            </div>
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.email && <span>{errors.email.message}</span>}
            </p>
          </div>

          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px] flex'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none cursor-pointer'>
                {showPassword ? (
                  <EyeOff onClick={togglePasswordVisibility} />
                ) : (
                  <Eye onClick={togglePasswordVisibility} />
                )}
              </div>
              <label
                className='flex h-full w-full absolute pointer-events-none left-0 -top-4 text-[11px] font-normal leading-tight before:pointer-events-none before:mr-1 before:w-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.5] transition-all peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 text-gray-50 
                '>
                <p>Senha</p>
              </label>
            </div>
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.password && <span>{errors.password.message}</span>}
            </p>
          </div>

          <div className='flex items-center justify-center gap-4'>
            <button
              className='hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
              type='submit'>
              Pronto!
            </button>
            <Link href={'/password/adicionaremail'}>
              <p className='italic text-orange-500 hover:underline cursor-pointer'>
                Esqueceu sua senha?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
