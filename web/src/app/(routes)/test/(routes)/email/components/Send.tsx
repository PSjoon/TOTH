'use client'

import { Resend } from 'resend'

export function Send() {
  function HandleEmail() {
    const resend = new Resend('re_JfjB35NT_DuwaHLAtJSG411EBXu7KUe23')

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'pedrosantos.joon@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    })
  }

  return (
    <div>
      <button onClick={HandleEmail}>Clique</button>
    </div>
  )
}
