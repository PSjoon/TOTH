'use client'

import { useState } from 'react'

export default function Componente1() {
  const [Test, setTest] = useState(
    '<h1>H1</h1><h2>H2</h2><p>left</p><p class="ql-align-center">center</p><p class="ql-align-justify">justify tes</p><p class="ql-align-right">right</p><ol><li>pointer</li><li>test</li></ol><ul><li>order1</li><li>2</li></ul><p><br></p>',
  )

  const test =
    '<h1>H1</h1><h2>H2</h2><p>left</p><p class="ql-align-center">center</p><p class="ql-align-justify">justify tes</p><p class="ql-align-right">right</p><ol><li>pointer</li><li>test</li></ol><ul><li>order1</li><li>2</li></ul><p><br></p>'

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: Test }}
        className='mx-2 lg:mx-24 my-4 border-y-[1px] rounded-3xl border-orange-500 text-white-200 bg-gray-200'></div>
    </>
  )
}
