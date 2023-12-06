'use client'

import { api } from '@/lib/api'
import { Move } from 'lucide-react'
import { fetchData } from 'next-auth/client/_utils'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

interface ItemType {
  id: number
  name: string
  chosen: boolean
}

export function ListCollege() {
  const [state, setState] = useState<ItemType[]>([])
  const { by } = useParams()

  const fetchData = async () => {
    try {
      const response = await api.get(`/college/${by}`)

      const data = response.data

      let idCounter = 0

      const newArray: ItemType[] = data.reduce(
        (acc: ItemType[], item: { college: string[] }) => {
          const nonEmptyValues = item.college.filter(
            (valor) => valor.trim() !== '',
          )
          return acc.concat(
            nonEmptyValues.map((value) => ({
              id: idCounter++,
              name: value,
              chosen: false,
            })),
          )
        },
        [],
      )

      setState(newArray)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [by])

  async function handleSumbit() {
    try {
      const response = await api.post(`/college/modify/${by}`, {
        state,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='h-[70vh] grid grid-flow-row mx-2 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'>
        {state ? (
          <div className='grid grid-flow-row grid-rows-2'>
            <div className='p-4'>
              <ReactSortable list={state} setList={setState}>
                {state.map((item) => (
                  <div
                    key={item.id}
                    className='pb-4 mr-52 flex gap-4 leading-relaxed bg-gray-200 cursor-move text-white-50'>
                    <Move width={18} />
                    {item.name}
                  </div>
                ))}
              </ReactSortable>
            </div>
            <div></div>
            {state ? (
              <div className='flex justify-center'>
                <button
                  className='h-10 my-4 hover:bg-orange-600 text-black font-bold focus:outline-none focus:shadow-outline rounded-full bg-orange-500 p-2'
                  type='submit'
                  onClick={handleSumbit}>
                  Confirmar!
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  )
}
