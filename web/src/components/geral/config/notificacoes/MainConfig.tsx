'use client'

import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'
import email from 'next-auth/providers/email'
import { FormEvent, useEffect, useState } from 'react'

export function MainConfig() {
  const [email, setEmail] = useState(false)
  const [promo, setPromo] = useState(false)
  const [like, setLike] = useState(false)
  const [follow, setFollow] = useState(false)
  const [post, setPost] = useState(false)
  const jwtInFo = getUserJS()

  const fetchDataAlter = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      try {
        const response = await api.get(`/notifyget/${sub}`)

        setEmail(response.data.emailNotify)
        setPromo(response.data.promoNotify)
        setLike(response.data.likeNotify)
        setFollow(response.data.followNotify)
        setPost(response.data.postNotify)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function SumitNotify() {
    if (jwtInFo) {
      const { sub } = jwtInFo
      try {
        const response = await api.post(`/notify/${sub}`, {
          email,
          promo,
          like,
          follow,
          post,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchDataAlter()
  }, [])

  return (
    <div className='grid gap-6 mt-6 grid-cols-1 mx-4 '>
      <div className='p-[3px] flex justify-between items-center rounded-3xl bg-gray-800'>
        <p className='ml-2'>Notificação de Recomendações</p>
        <div className='flex items-center justify-center mr-1'>
          <input
            id='link-checkbox'
            type='checkbox'
            checked={email}
            onChange={() => setEmail(!email)}
            className='w-11 h-5 rounded-xl text-orange-500 bg-gray-600 border-orange-500 focus:ring-orange-500 checked:opacity-90'
          />
        </div>
      </div>

      <div className='w-full p-[3px] flex justify-between rounded-3xl bg-gray-800'>
        <p className='ml-2'>Notificações Promocionais</p>
        <div className='flex items-center justify-center mr-1'>
          <input
            id='link-checkbox'
            type='checkbox'
            checked={promo}
            onChange={() => setPromo(!promo)}
            className='w-11 h-5 rounded-xl text-orange-500 bg-gray-600 border-orange-500 focus:ring-orange-500 checked:opacity-90'
          />
        </div>
      </div>

      <div className='w-full p-[3px] flex justify-between rounded-3xl bg-gray-800'>
        <p className='ml-2'>Notificação de Curtida</p>
        <div className='flex items-center justify-center mr-1'>
          <input
            id='link-checkbox'
            type='checkbox'
            checked={like}
            onChange={() => setLike(!like)}
            className='w-11 h-5 rounded-xl text-orange-500 bg-gray-600 border-orange-500 focus:ring-orange-500 checked:opacity-90'
          />
        </div>
      </div>

      <div className='w-full p-[3px] flex justify-between rounded-3xl bg-gray-800'>
        <p className='ml-2'>Notificação de Novo Seguidor</p>
        <div className='flex items-center justify-center mr-1'>
          <input
            id='link-checkbox'
            type='checkbox'
            checked={follow}
            onChange={() => setFollow(!follow)}
            className='w-11 h-5 rounded-xl text-orange-500 bg-gray-600 border-orange-500 focus:ring-orange-500 checked:opacity-90'
          />
        </div>
      </div>

      <div className='w-full p-[3px] flex justify-between rounded-3xl bg-gray-800'>
        <p className='ml-2'>Notificação de Posts Salvados</p>
        <div className='flex items-center justify-center mr-1'>
          <input
            id='link-checkbox'
            type='checkbox'
            checked={post}
            onChange={() => setPost(!post)}
            className='w-11 h-5 rounded-xl text-orange-500 bg-gray-600 border-orange-500 focus:ring-orange-500 checked:opacity-90'
          />
        </div>
      </div>

      <button
        className='w-20 hover:bg-orange-500 ml-[45%] font-bold py-1 focus:outline-none focus:shadow-outline rounded-3xl border border-orange-500 bg-gray-200'
        type='submit'
        onClick={SumitNotify}>
        Pronto!
      </button>
    </div>
  )
}
