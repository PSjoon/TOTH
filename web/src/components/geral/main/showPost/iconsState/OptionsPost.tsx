'use client'

import { Bookmark, MoreVertical } from 'lucide-react'
import { Transition } from '@headlessui/react'
import { ShowOptions } from './ShowOptions'
import { useEffect, useState } from 'react'
import { getUserJS } from '@/lib/authGithub'
import { api } from '@/lib/api'

export function OptionsPost(artigo: any) {
  const [pointiconColor, setpointIconColor] = useState('#EFEFEF')
  const [pointfillIcon, setpointfillIcon] = useState('#EFEFEF')
  const [isVisible, setVisible] = useState(false)
  const [CheckSave, setCheckSave] = useState(false)

  const checkSaveArticle = () => {
    const artigoIdentity = artigo.artigo.id

    if (artigo.artigo.savedPosts.includes(artigoIdentity)) {
      setCheckSave(true)
    }
  }

  useEffect(() => {
    checkSaveArticle()
  }, [])

  const handleIconClick = async () => {
    const jwtInFo = getUserJS()

    if (jwtInFo) {
      const { sub } = jwtInFo

      const artigoId = artigo.artigo.id
      if (artigoId.includes(artigo.artigo.savePost)) {
        setCheckSave(true)
      }

      try {
        const response = await api.post('/savePost', {
          sub,
          artigoId,
        })

        const ShowArtigoId = artigo.artigo.id
        if (response.data.savedPosts.includes(ShowArtigoId)) {
          setCheckSave(true)
        } else {
          setCheckSave(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const clickVisible = () => {
    setVisible(!isVisible)
    setpointIconColor(pointiconColor === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
    setpointfillIcon(pointfillIcon === '#EFEFEF' ? '#F56B07' : '#EFEFEF')
  }

  return (
    <div className='flex mr-2 z-50'>
      <span title='Salvar Postagem'>
        <Bookmark
          size={30}
          color={CheckSave ? '#F56B07' : '#EFEFEF'}
          fill={CheckSave ? '#F56B07' : '#EFEFEF'}
          onClick={handleIconClick}
          className='md:w-8 md:h-8 transition-transform hover:scale-110 cursor-pointer'
        />
      </span>

      <span title='Opções de Postagem'>
        <MoreVertical
          onClick={clickVisible}
          size={32}
          color={pointiconColor}
          fill={pointfillIcon}
          className='md:w-[34px] md:h-[34px] ml-2 transition-transform hover:scale-110 cursor-pointer'
        />
      </span>
      <Transition
        show={isVisible}
        enter='transition-all ease-in-out duration-500 delay-[200ms]'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <ShowOptions artigoId={artigo.artigo} />
      </Transition>
    </div>
  )
}
