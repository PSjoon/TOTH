'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { getUserJS } from '@/lib/authGithub'

const createUserFormSchema = z
  .object({
    email: z.string().min(1, 'Campo Obrigatório').email('Email Inválido'),
    username: z.string().min(1, 'Campo Obrigatório'),
    nickname: z.string().optional(),
    terms: z.boolean().refine((value) => value === true, 'Campo Obrigatório'),
    password: z.string().min(6, 'Digite ao Menos 6 Caracteres'),
    confirmPassword: z.string().min(1, 'Campo Obrigatório'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As Duas Senhas são Diferentes',
    path: ['confirmPassword'],
  })

type createUserFormData = z.infer<typeof createUserFormSchema>

export function InsideCadastro() {
  // password
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // eyePassword
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  // hookConfig
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  // send to BD
  const routes = useRouter()

  // const jwtInFo = getUserJS()

  // if (jwtInFo) {
  //   routes.push('/error=userLogged')
  // }

  async function createNewUser(data: any) {
    try {
      const response = await api.post('/cadastrar', {
        email: data.email,
        username: data.username,
        nickname: data.nickname,
        password: data.password,
        terms: data.terms,
      })

      console.log(response)

      const token = response.data.token

      // console.log(token)

      Cookies.set('token', token, { path: '/', expires: 30 })

      routes.push('/')
    } catch (error) {
      // console.log(error)
      window.location.search = 'error=userNotExisting'
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-sm rounded-2xl text-white-50'>
        <form
          className='px-8 pt-0 pb-8 mb-4 grid gap-6 grid-cols-1 place-items-center'
          onSubmit={handleSubmit(createNewUser)}>
          {/* email */}
          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px]'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                title='Digite seu Melhor Email'
                type='email'
                {...register('email')}
                name='email'
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

          {/* username */}
          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px]'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                title='Digite seu Nome'
                type='text'
                {...register('username')}
                name='username'
              />
              <label
                className='flex h-full w-full absolute pointer-events-none left-0 -top-4 text-[11px] font-normal leading-tight before:pointer-events-none before:mr-1 before:w-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.5] transition-all peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 text-gray-50
                '>
                <p>Nome</p>
              </label>
            </div>
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.username && <span>{errors.username.message}</span>}
            </p>
          </div>

          {/* nickname */}
          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px]'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                title='Digite seu Apellido'
                type='text'
                {...register('nickname')}
                name='nickname'
              />
              <label
                className='flex h-full w-full absolute pointer-events-none left-0 -top-4 text-[11px] font-normal leading-tight before:pointer-events-none before:mr-1 before:w-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.5] transition-all peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 text-gray-50
                '>
                <p>Nome de Usuário</p>
              </label>
            </div>
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.nickname && <span>{errors.nickname.message}</span>}
            </p>
          </div>

          {/* password */}
          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px] flex'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                title='Digite sua Senha'
                type={showPassword ? 'text' : 'password'}
                value={password}
                {...register('password')}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                name='password'
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

          {/* confirm password */}
          <div className='w-72'>
            <div className='relative h-11 w-full min-w-[200px] flex'>
              <input
                className='peer h-full w-full rounded-2xl border border-white-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all placeholder-shown:border-t-white-300 focus:border-2 focus:border-orange-500 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0'
                placeholder=' '
                title='Confirme sua Senha'
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                {...register('confirmPassword')}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete='current-password'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none cursor-pointer'>
                {showPasswordConfirm ? (
                  <EyeOff onClick={togglePasswordVisibilityConfirm} />
                ) : (
                  <Eye onClick={togglePasswordVisibilityConfirm} />
                )}
              </div>
              <label
                className='flex h-full w-full absolute pointer-events-none left-0 -top-4 text-[11px] font-normal leading-tight before:pointer-events-none before:mr-1 before:w-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.5] transition-all peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 text-gray-50
                '>
                <p>Confirmar Senha</p>
              </label>
            </div>
            <p className='text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </p>
          </div>

          {/* terms */}
          <div className='items-center'>
            <input
              id='link-checkbox'
              type='checkbox'
              {...register('terms')}
              title='Termos de Uso'
              value=''
              className='w-4 h-4 text-orange-500 bg-orange-500 bg-opacity-80 border-orange-500 focus:ring-orange-500 focus:ring-1 rounded'
            />
            <label
              htmlFor='link-checkbox'
              className='ml-2 text-sm font-medium text-white'>
              Eu concordo com os{' '}
              <a href='#' className='text-orange-500 hover:underline'>
                termos e condições
              </a>
            </label>
            <p className='text-red-500 text-[11px] ml-6 mt-0.5 opacity-80'>
              {errors.terms && <span>{errors.terms.message}</span>}
            </p>
          </div>

          {/* confirm */}
          <div className='flex items-center justify-center'>
            <button
              className='hover:bg-orange-600 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-3xl bg-orange-500'
              type='submit'
              title='Confirme seu Cadastro e seja Bem-Vindo(a) ao TOTH'>
              Pronto!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
