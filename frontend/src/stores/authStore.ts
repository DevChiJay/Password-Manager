import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  
  // Actions
  setAuth: (user: User, token: string) => void
  setUser: (user: User) => void
  clearAuth: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        // Store token in localStorage for axios interceptor
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(user))
        
        set({
          user,
          token,
          isAuthenticated: true,
        })
      },

      setUser: (user) => {
        localStorage.setItem('user_data', JSON.stringify(user))
        set({ user })
      },

      clearAuth: () => {
        // Clear localStorage
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      hydrate: () => {
        // Hydrate from localStorage on app load
        const token = localStorage.getItem('auth_token')
        const userDataStr = localStorage.getItem('user_data')
        
        if (token && userDataStr) {
          try {
            const user = JSON.parse(userDataStr)
            set({
              user,
              token,
              isAuthenticated: true,
            })
          } catch {
            // Clear invalid data
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
