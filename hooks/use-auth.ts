// @/hooks/use-auth.ts
'use client'

import { useState, useEffect } from 'react'
import { AuthServiceClient } from '@/lib/auth-client'
import { User } from '@/lib/auth-types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(AuthServiceClient.getClientUser())
  }, [])

  const logout = () => {
    AuthServiceClient.logout()
    setUser(null)
  }

  return { user, logout }
}