'use client'

import React, { useState } from 'react'
import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
import './quill.css'

export default function Form() {
  const base = 'test'
  const [text, setText] = useState(base)

  const handleSubmit = () => {
    console.log(text)
  }

  return (
    <body>
      <div className='bg-gray-600'>
        <ReactQuill value={text} onChange={setText} />
        <button onClick={handleSubmit} type='submit'>
          Send
        </button>
      </div>
    </body>
  )
}
