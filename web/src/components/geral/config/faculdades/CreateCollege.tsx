'use client'

import { api } from '@/lib/api'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { MaxCollege } from './MaxCollege'

export function CreateCollege() {
  const [College, setCollege] = useState('')
  const [CollegeEmpty, setCollegeEmpty] = useState(false)

  const { by } = useParams()

  const fetchData = async () => {
    const response = await api.get(`/college/${by}`)

    const dataResponse = response.data[0].college.length

    if (dataResponse >= 1 && dataResponse < 8) {
      setCollegeEmpty(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [by])

  async function HandleSumit() {
    try {
      const response = await api.post(`/college/${by}`, {
        college: College,
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {CollegeEmpty ? (
        <div className='h-40 md:w-72 mx-2 lg:ml-20 mb-4 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 bg-gray-200'>
          <form onSubmit={HandleSumit} className='grid grid-flow-row gap-10'>
            <input
              type='text'
              name='title'
              className='md:w-64 mx-1 rounded-2xl border border-orange-500 px-3 py-3 font-sans text-sm font-normal text-white-50 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 focus:outline-none focus:ring-0 bg-gray-200'
              onChange={(event) => setCollege(event.target.value)}
              placeholder='Digite sua Graduação'
            />

            <div className='flex items-center justify-center'>
              <button
                className='hover:bg-orange-600 text-black font-bold focus:outline-none focus:shadow-outline rounded-full bg-orange-500 p-2'
                type='submit'>
                Enviar!
              </button>
            </div>
          </form>
        </div>
      ) : (
        <MaxCollege />
      )}
    </>
  )
}
