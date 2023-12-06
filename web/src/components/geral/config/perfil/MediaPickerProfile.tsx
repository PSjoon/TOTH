'use client'

import { useState, ChangeEvent } from 'react'

export function MediaPickerProfile() {
  const [preview, setPreview] = useState<string | null>(null)

  function onPictureSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    console.log(files)

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)

    console.log(previewURL)
  }

  return (
    <>
      <input
        onChange={onPictureSelected}
        name='picture'
        type='file'
        accept='image/*'
        id='getPicture'
        className='invisible h-0'
      />

      {preview && (
        <img
          src={preview}
          alt=''
          // className='block cover rounded-none w-[100%] h-[30vh] opacity-10 object-center'
          //   className='display: block; object-fit: cover; border-radius: 0px; width: 100%; height: 30vh; opacity: 1; object-position: center 30%;'
          className='w-16 md:w-24 ml-2 justify-center items-center place-items-center flex rounded-full bg-white-200 overflow-hidden '
        />
      )}
    </>
  )
}
