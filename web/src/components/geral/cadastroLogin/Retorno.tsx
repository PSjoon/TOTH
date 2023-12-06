export function Retorno() {
  return (
    <div className='absolute -ml-24 -mt-16 text-orange-500 bg-gray-300 opacity-80 rounded-r-3xl rounded-l-lg p-2 pl-4'>
      <div className='flex'>
        Email Já Cadastrado, Faça
        <a href='/logar'>
          <p className='ml-1 underline hover:text-white-50 cursor-pointer'>
            Login!
          </p>
        </a>
      </div>
    </div>
  )
}
