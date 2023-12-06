import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ShowOptions(artigoId: any) {
  const [IsFollow, setIsFollow] = useState(false)
  const [Return, setReturn] = useState('')

  const jwtInFo = getUserJS()
  const id = useParams()

  async function Strike() {
    const idArticle = artigoId.artigoId.id

    try {
      const userFollows = await api.post('/strike', { idArticle })
    } catch (error) {
      console.log(error)
    }
  }

  async function Follow() {
    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.post(`/perfil/${sub}`, {
        user: artigoId.artigoId.by,
      })

      setIsFollow(!IsFollow)
      if (response) {
        setReturn('Seguido Usuário')
      }
    }
  }

  const fetchData = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.post(`/perfil/follow/${sub}`)

      console.log(response.data)

      if (response.data.includes(artigoId.artigoId.by)) {
        setIsFollow(true)
      }

      try {
      } catch (error) {
        console.log(error)
      }
    }
  }

  const isUser = () => {
    if (jwtInFo) {
      const { sub } = jwtInFo
      if (artigoId.artigoId.by != sub) {
        return true
      }
    }
  }

  useEffect(() => {
    fetchData()
    isUser()
  }, [])

  return (
    <div className='w-25 absolute grid grid-flow-row -ml-[120px] mt-10 overflow-hidden leading-relaxed rounded-3xl bg-gray-900'>
      {isUser() ? (
        <div className='text-sm p-2 mx-1 cursor-pointer'>
          {!IsFollow ? (
            <p className='' onClick={Follow}>
              Seguir Usuário
            </p>
          ) : (
            <p className='text-orange-500' onClick={Follow}>
              Deixar de Seguir
            </p>
          )}
        </div>
      ) : (
        <div className='text-sm p-2 mx-1 opacity-50 cursor-default'>
          <p className=''>Você é este Usuário</p>
        </div>
      )}
      <div className='text-sm p-2 mx-1'>
        <p
          className='underline text-orange-500 cursor-pointer'
          onClick={Strike}>
          Denunciar
        </p>
      </div>
    </div>
  )
}
