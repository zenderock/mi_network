import { jwtDecode } from 'jwt-decode'
import { User } from './auth-types'

export class AuthServiceClient {
  private static readonly TOKEN_KEY = 'authToken'
  private static readonly USER_KEY = 'auth_user'

  static getClientUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static getClientToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    localStorage.setItem(this.TOKEN_KEY, data.access_token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user))
    return data.user
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated(): boolean {
    const token = this.getClientToken()
    if (!token) return false
    try {
      const decoded: { exp: number } = jwtDecode(token)
      return decoded.exp > Date.now() / 1000
    } catch {
      return false
    }
  }
}