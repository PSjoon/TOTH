import { Conteudo } from './Conteudo'

export function RightHome() {
  return (
    <div className='lg:w-[24vw] w-[24vw] h-[86%] border-y-[1px] rounded-3xl border-orange-500 bg-gray-400 text-white-200 fixed overflow-y-auto scrollbar-none '>
      <p className='mt-4 md:text-lg lg:text-xl grid grid-cols-1 mb-4 place-items-center'>
        Outros Artigos
      </p>
      <div className='grid gap-6 grid-cols-1 place-items-center'>
        <Conteudo />
      </div>
    </div>
  )
}
