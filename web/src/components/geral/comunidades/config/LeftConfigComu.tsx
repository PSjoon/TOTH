'use client'

import { api } from '@/lib/api'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { MaxCollege } from '../../config/faculdades/MaxCollege'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const createUserFormSchema = z.object({
  email: z.string().email('Digite um Email Válido'),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export function LeftConfigComu() {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  async function HandleSumit(data: any) {
    try {
      const response = await api.post(`/addmembers/${id}`, {
        members: data.email,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='h-40 md:w-72 mx-2 lg:ml-14 mb-4 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 bg-gray-200'>
        <form
          onSubmit={handleSubmit(HandleSumit)}
          className='grid grid-flow-row gap-8'>
          <div className=''>
            <label htmlFor='AddMembers' className='ml-4 leading-relaxed'>
              Adicione novos Membros
            </label>
            <input
              type='text'
              id='AddMembers'
              className='md:w-64 mx-1 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
              {...register('email')}
              placeholder='Digite o Email'
            />
          </div>
          <p className='absolute text-red-500 text-[11px] ml-4 mt-[70px] opacity-80'>
            {errors.email && <span>{errors.email.message}</span>}
          </p>

          <div className='flex items-center justify-center'>
            <button
              className='hover:bg-orange-600 text-black font-bold focus:outline-none focus:shadow-outline rounded-full bg-orange-500 p-2'
              type='submit'>
              Enviar!
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
