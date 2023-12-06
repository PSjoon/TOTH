import { CreateCollege } from '@/components/geral/config/faculdades/CreateCollege'
import { ConfigLeft } from '@/components/geral/configleft/ConfigLeft'

export default function Faculdades() {
  return (
    <>
      <CreateCollege />
      <div className='hidden md:block w-[19vw] mt-8 ml-[98px] py-2 rounded-3xl border border-orange-500 bg-gray-300 fixed'>
        <ConfigLeft />
      </div>
    </>
  )
}
