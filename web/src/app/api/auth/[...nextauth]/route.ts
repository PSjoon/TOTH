import { authConfig } from '@/lib/authGoogle'
import NextAuth from 'next-auth/next'

const handler = NextAuth(authConfig)

// console.log(handler)

export { handler as GET, handler as POST }
