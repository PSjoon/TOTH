'use client'

import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { fetchData } from 'next-auth/client/_utils'
import email from 'next-auth/providers/email'
import { useParams, useRouter } from 'next/navigation'
import { type } from 'os'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import emailjs from '@emailjs/browser'

const newPasswordFormsSchema = z.object({
  email: z.string().email('Email Inválido'),
})

type newPasswordFormsData = z.infer<typeof newPasswordFormsSchema>

export function AddEmail() {
  const [Retorno, setRetorno] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newPasswordFormsData>({
    resolver: zodResolver(newPasswordFormsSchema),
  })

  const routes = useRouter()

  function ChangePassword(data: any) {
    const email = data.email
    console.log(email)

    const templateParams = {
      to_name: email,
      to_email: email,
      from_name: 'TOTH',
      message: 'nada',
      email: 'pedro@example.com',
    }

    emailjs
      .send(
        'service_u24drvw', // service id
        'template_2vc51e6', // template id
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

  return (
    <>
      {Retorno == 'Senha Alterada com Sucesso' ? (
        <div className='absolute bottom-[82vh] -left-1 text-orange-500 bg-gray-300 opacity-80 rounded-r-3xl rounded-l-lg p-2 pl-4'>
          <div className='flex'>
            Senha Alterada com Sucesso, Redirecionando para o Inicio...
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit(ChangePassword)}
        className='w-[30vw] h-[25vh] mx-2 border-[1px] border-orange-500 text-white-200 bg-gray-200 rounded-3xl p-4 flex flex-col gap-6 justify-center items-center'>
        <div>
          <label htmlFor='email'>Digite seu Email para Recuperar Senha:</label>

          <input
            className='w-full p-[3px] mt-1 pl-4 text-sm rounded-3xl bg-gray-800 ring-0 focus:outline-0 disabled:border-0 focus:outline-none focus:ring-0 focus:border-gray-500  focus:border-1'
            placeholder='Adicione seu Email'
            type='text'
            {...register('email')}
            id='email'
          />

          <p className='absolute text-red-500 text-[11px] ml-4 mt-0.5 opacity-80'>
            {errors.email && <span>{errors.email.message}</span>}
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
