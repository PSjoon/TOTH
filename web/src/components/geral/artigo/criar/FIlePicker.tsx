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

    console.log(previewURL)
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
    </>
  )
}
