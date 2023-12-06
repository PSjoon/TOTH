import { LeftConfigComu } from '@/components/geral/comunidades/config/LeftConfigComu'
import { ShowMembers } from '@/components/geral/comunidades/config/ShowMembers'

export default function ConfigCommunity() {
  return (
    <div className='mt-[120px] grid grid-flow-row'>
      <div className=''>
        <LeftConfigComu />
      </div>

      <div className=''>
        <ShowMembers />
      </div>
    </div>
  )
}
