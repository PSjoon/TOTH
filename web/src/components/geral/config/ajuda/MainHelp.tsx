'use client'

import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'
import Link from 'next/link'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function MainHelp() {
  const [Delete, setDelete] = useState(false)
  const [Return, setReturn] = useState('')

  async function DeleteAccount() {
    const routes = useRouter()

    const jwtInFo = getUserJS()

    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.delete(`/perfil/${sub}`)

      if (response) {
        Cookies.remove('token', { path: '/' })
        routes.push('/home')
      } else {
        setReturn('Houve um erro inesperado')
      }

      try {
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='grid gap-6 mt-6 grid-cols-1 mx-4'>
      <Link href={'mailto:pedrosantos.joon@gmail.com'} target='_blank'>
        <div className='p-[3px] flex justify-between rounded-3xl bg-gray-800'>
          <p className='ml-2'>Reclamações</p>
        </div>
      </Link>
      <Link href={'/api/auth/logout'}>
        <div className='p-[3px] flex justify-between rounded-3xl bg-gray-800'>
          <p className='ml-2 text-orange-500' title='Deslogar'>
            Sair
          </p>
        </div>
      </Link>
      <div className='p-[3px] flex justify-between rounded-3xl bg-gray-800 text-orange-500'>
        <p
          className='ml-2 cursor-pointer'
          onClick={() => {
            setDelete(!Delete)
          }}>
          Deletar Conta
        </p>
      </div>

      {Delete ? (
        <div className='absolute w-[25vw] h-[35vh] top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 border-x-[1px] border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-400 flex flex-col justify-center items-center gap-8'>
          <div className=''>Certeza que Deseja Excluir sua Conta?</div>

          <div className='gap-4 flex items-center justify-center place-items-center'>
            <div
              className='w-24 h-10 mt-5 mb-1 rounded-full bg-orange-500 hover:bg-orange-900 flex justify-center items-center cursor-pointer'
              onClick={DeleteAccount}>
              Confirmar
            </div>

            <button
              className='w-24 h-10 mt-5 mb-1 rounded-full bg-orange-500 hover:bg-orange-900'
              onClick={() => {
                setDelete(!Delete)
              }}>
              Fechar
            </button>
          </div>
        </div>
      ) : null}
      <div className='p-[3px] rounded-3xl bg-gray-800'>
        <div className='ml-2 flex'>
          <p>Mande-nos um Email:</p>
          <p className='ml-2 text-orange-500'> toth@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
