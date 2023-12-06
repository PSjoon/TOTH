import { getUserJS } from '@/lib/authGithub'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Options() {
  const jwtInFo = getUserJS()

  if (jwtInFo) {
    const { sub } = jwtInFo

    return (
      <div className='w-40 h-56 bg-gray-900 rounded-3xl opacity-95 grid justify-start items-center px-4 py-1'>
        <Link href={`/perfil/${sub}`}>
          <p className='text-orange-500' title='Acessar Perfil'>
            Perfil
          </p>
        </Link>

        <Link href={`/config/${sub}/perfil/`}>
          <p className='' title='Configurações de Perfil'>
            Configurações
          </p>
        </Link>

        <Link href={'/comunidades/home'}>
          <p className='' title='Acessar Comunidades'>
            Comunidades
          </p>
        </Link>

        <Link href={`/config/${sub}/ajuda`}>
          <p className='' title='Acessar Aba de Ajuda'>
            Ajuda
          </p>
        </Link>

        <Link href={'/api/auth/logout'}>
          <p className='text-orange-500' title='Deslogar'>
            Sair
          </p>
        </Link>
      </div>
    )
  }
}
