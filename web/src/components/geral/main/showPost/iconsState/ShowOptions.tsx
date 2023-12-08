import { ReturnAll } from '@/components/geral/retorno/ReturnAll'
import { api } from '@/lib/api'
import { getUserJS } from '@/lib/authGithub'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ShowOptions(artigoId: any) {
  const [IsFollow, setIsFollow] = useState(false)
  const [Return, setReturn] = useState('')

  const routes = useRouter()

  const jwtInFo = getUserJS()
  if (!jwtInFo) {
    routes.push('/cadastrar?error=UserLoggedRequire')
  }

  async function Strike() {
    const idArticle = artigoId.artigoId.id

    try {
      const userFollows = await api.post('/strike', { idArticle })
      if (userFollows) {
        const currentURL = window.location.href
        console.log(currentURL)
        setReturn('denunciadoSucesso')
      }
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
        // setReturn('Seguido Usuário')
        routes.push('/?error=seguidoUsuario')
      }
    }
  }

  const fetchData = async () => {
    if (jwtInFo) {
      const { sub } = jwtInFo

      const response = await api.post(`/perfil/follow/${sub}`)

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
    <>
      {Return ? <ReturnAll message={Return} /> : null}

      <div className='w-25 absolute grid grid-flow-row -ml-[120px] mt-10 overflow-hidden leading-relaxed rounded-3xl bg-gray-900 -z-10'>
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
    </>
  )
}
