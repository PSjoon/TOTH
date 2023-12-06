import decode from 'jwt-decode'
import Cookies from 'js-cookie'

export interface User {
  nickname: string
  username: string
  profilePictures: string
  sub: string
}

export function getUserJS() {
  const token = Cookies.get('token')

  if (token) {
    const user: User = decode(token)

    // console.log(user)

    return user
  }
}
