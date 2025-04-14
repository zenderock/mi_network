import { cookies } from 'next/headers'
import { User } from './auth-types'

export class AuthServiceServer {
  private static readonly TOKEN_KEY = 'auth_token'
  private static readonly USER_KEY = 'auth_user'

  static async getServerUser(): Promise<User | null> {
    const user = (await cookies()).get(this.USER_KEY)?.value
    return user ? JSON.parse(user) : null
  }

  static async getServerToken(): Promise<string | null> {
    return (await cookies()).get(this.TOKEN_KEY)?.value || null
  }
}