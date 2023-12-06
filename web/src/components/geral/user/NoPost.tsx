export function NoPost() {
  return (
    <>
      <main className='h-64 mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200 flex justify-center items-center'>
        Nenhuma Postagem ainda...
        <a
          href={'/artigo/criar'}
          className='text-orange-500 hover:underline ml-1'>
          Publique uma!
        </a>
      </main>
    </>
  )
}
