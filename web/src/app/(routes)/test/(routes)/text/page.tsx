'use client'

import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

if (typeof window == 'undefined') {
  require('tinymce/tinymce')
  require('/node_modules/tinymce/themes/silver')
  require('/node_modules/tinymce/plugins/advlist')
  require('/node_modules/tinymce/plugins/autolink')
  require('/node_modules/tinymce/plugins/lists')
  require('/node_modules/tinymce/plugins/link')
  require('/node_modules/tinymce/plugins/image')
  require('/node_modules/tinymce/plugins/charmap')
  require('/node_modules/tinymce/plugins/preview')
  require('/node_modules/tinymce/plugins/anchor')
  require('/node_modules/tinymce/plugins/searchreplace')
  require('/node_modules/tinymce/plugins/visualblocks')
  require('/node_modules/tinymce/plugins/code')
  require('/node_modules/tinymce/plugins/fullscreen')
  require('/node_modules/tinymce/plugins/insertdatetime')
  require('/node_modules/tinymce/plugins/media')
  require('/node_modules/tinymce/plugins/table')
  require('/node_modules/tinymce/plugins/code')
  require('/node_modules/tinymce/plugins/help')
  require('/node_modules/tinymce/plugins/wordcount')
}

export default function App() {
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current != null) {
      console.log(editorRef.current)
    }
  }

  return (
    <div>
      <Editor
        apiKey='t62g61b9wjz1dxagtt8a5vua2kfb7j4ijxojz4fg5ke7kglk'
        // onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          skin: 'oxide-dark',
          content_css: 'dark',
          height: 500,

          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat ',

          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #181818; }',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  )
}
