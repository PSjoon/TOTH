'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
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
        id='media'
        className='invisible h-0'
      />

      {preview && (
        <img
          src={preview}
          alt=''
          className='h-44 md:h-32 md:w-full ml-[26vw] md:ml-[20vw] mt-[60px] md:mt-[76px] aspect-video rounded-xl object-cover'
        />
      )}
    </>
  )
}
