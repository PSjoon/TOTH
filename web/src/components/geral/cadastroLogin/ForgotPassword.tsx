'use client'

import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { fetchData } from 'next-auth/client/_utils'
import { useParams, useRouter } from 'next/navigation'
import { type } from 'os'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newPasswordFormsSchema = z
  .object({
    password: z.string().min(6, 'Digite ao Menos 6 Caracteres'),
    confirmPassword: z.string().min(1, 'Campo Obrigatório'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As Duas Senhas não Coincidem',
    path: ['confirmPassword'],
  })

type newPasswordFormsData = z.infer<typeof newPasswordFormsSchema>

export function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [Retorno, setRetorno] = useState('')
  const jwtInFo = getUserJS()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newPasswordFormsData>({
    resolver: zodResolver(newPasswordFormsSchema),
  })

  const routes = useRouter()

  async function ChangePassword(data: any) {
    const jwtInFo = getUserJS()

    const currentURL = window.location.href
    const urlParams = new URL(currentURL)
    const sub = urlParams.searchParams.get('email')

    console.log(sub)
    console.log(data.password)

    try {
      const response = await api.post(`/passwordForgot/${sub}`, {
        password: data.password,
      })

      if (response) {
        setRetorno('Senha Alterada com Sucesso')
        setTimeout(() => {
          routes.push('/')
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (jwtInFo) {
      routes.push('/cadastrar?error=UserLoggedRequire')
    }
  }, [])

  return (
    <>
      {Retorno == 'Senha Alterada com Sucesso' ? (
        <div className='absolute bottom-[92vh] -left-1 text-orange-500 bg-gray-300 opacity-80 rounded-r-3xl rounded-l-lg p-2 pl-4'>
          <div className='flex'>
            Senha Alterada com Sucesso, Redirecionando para o Inicio...
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit(ChangePassword)}
        className='w-[260px] h-[250px] mx-2 border-[1px] border-orange-500 text-white-200 bg-gray-200 rounded-3xl p-4 flex flex-col gap-6 justify-center items-center'>
        <div>
          <label htmlFor='senha'>Digite sua Nova Senha:</label>

          <div className='flex'>
            <input
              className='w-[88%] p-[3px] pl-4 text-sm rounded-l-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-y-gray-500 focus:border-l-gray-500 focus:border-1 focus:border-r-0 border-r-0'
              placeholder='Senha'
              type={showPassword ? 'text' : 'password'}
              value={password}
              {...register('password')}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
              id='senha'
            />
            <div className=' top-[41vh] left-[81.6vw] flex items-center focus:outline-none cursor-pointer bg-gray-800 border border-gray-500 rounded-r-3xl border-l-0 p-[0.8px] px-[2px]'>
              {showPassword ? (
                <EyeOff onClick={togglePasswordVisibility} />
              ) : (
                <Eye onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>
          <p className='absolute text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
            {errors.password && <span>{errors.password.message}</span>}
          </p>
        </div>
        <div>
          <label htmlFor='senha'>Confirm sua Senha:</label>

          <div className='flex'>
            <input
              className='w-[88%] p-[3px] pl-4 text-sm rounded-l-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-y-gray-500 focus:border-l-gray-500 focus:border-1 focus:border-r-0 border-r-0'
              placeholder='Senha'
              type={showPasswordConfirm ? 'text' : 'password'}
              value={passwordConfirm}
              {...register('confirmPassword')}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete='current-password'
              id='senha'
            />
            <div className=' top-[52.1vh] left-[81.6vw] flex items-center focus:outline-none cursor-pointer bg-gray-800 border border-gray-500 rounded-r-3xl border-l-0 p-[0.8px] px-[2px]'>
              {showPasswordConfirm ? (
                <EyeOff onClick={togglePasswordVisibilityConfirm} />
              ) : (
                <Eye onClick={togglePasswordVisibilityConfirm} />
              )}
            </div>
          </div>
          <p className='absolute text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </p>
        </div>

        <button
          className='w-20 flex items-center justify-center hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
          type='submit'>
          Pronto!
        </button>
      </form>
    </>
  )
}
