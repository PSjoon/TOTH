'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPickerComu() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)

    // console.log(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name='coverUrl'
        type='file'
        accept='image/*'
        id='backgComunity'
        className='invisible h-0'
      />

      {preview && (
        <img
          src={preview}
          alt='Foto de Fundo da Comunidade'
          className='h-40 md:h-28 md:w-full mb-4 aspect-video rounded-xl object-cover'
        />
      )}
    </>
  )
}
