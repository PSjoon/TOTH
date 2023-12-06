export function RetornoLogin() {
  return (
    <div className='absolute -ml-24 -mt-16 text-orange-500 bg-gray-300 opacity-80 rounded-r-3xl rounded-l-lg p-2 pl-4'>
      <div className='flex'>
        Email não encontrado, Faça
        <a href='/cadastrar'>
          <p className='ml-1 underline hover:text-white-50 cursor-pointer'>
            Cadastro!
          </p>
        </a>
      </div>
    </div>
  )
}
