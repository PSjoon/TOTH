import { useRouter } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const redirectURL = new URL('/index', req.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
