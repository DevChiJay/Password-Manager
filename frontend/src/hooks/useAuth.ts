import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as authApi from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'
import type { LoginRequest, RegisterRequest } from '@/types'

interface ApiError {
  message?: string
}

/**
 * Hook for login mutation
 */
export const useLogin = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: async (data) => {
      // Store token IMMEDIATELY so axios interceptor can use it
      localStorage.setItem('auth_token', data.access_token)
      
      // Get user info with the new token
      try {
        const user = await authApi.getCurrentUser()
        setAuth(user, data.access_token)
        toast.success('Welcome back!', {
          description: `Logged in as ${user.email}`,
        })
        navigate('/dashboard')
      } catch {
        // If getting user fails, clear the token we just stored
        localStorage.removeItem('auth_token')
        toast.error('Failed to fetch user data')
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.detail || error?.message || 'Invalid email or password'
      
      // Check if it's an email verification error
      if (errorMessage.toLowerCase().includes('verify')) {
        toast.error('Email not verified', {
          description: errorMessage,
          duration: 6000,
        })
      } else {
        toast.error('Login failed', {
          description: errorMessage,
        })
      }
    },
  })
}

/**
 * Hook for register mutation
 */
export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: () => {
      toast.success('Account created successfully!', {
        description: 'Please check your email to verify your account.',
        duration: 6000,
      })
      // Don't auto-login - user needs to verify email first
      navigate('/login')
    },
    onError: (error: ApiError) => {
      toast.error('Registration failed', {
        description: error.message || 'Please try again',
      })
    },
  })
}

/**
 * Hook for logout
 */
export const useLogout = () => {
  const navigate = useNavigate()
  const { clearAuth } = useAuthStore()
  const queryClient = useQueryClient()

  return () => {
    authApi.logout()
    clearAuth()
    queryClient.clear() // Clear all cached queries
    toast.info('Logged out successfully')
    navigate('/login')
  }
}

/**
 * Hook to get current user data
 */
export const useCurrentUser = () => {
  const { isAuthenticated, user, setUser } = useAuthStore()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated && !user, // Only fetch if authenticated but no user data
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })

  // Handle success and error with useEffect pattern
  if (query.data && query.data !== user) {
    setUser(query.data)
  }

  if (query.isError) {
    useAuthStore.getState().clearAuth()
    queryClient.clear()
  }

  return query
}

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated
}

/**
 * Hook to get current user from store
 */
export const useUser = () => {
  const { user } = useAuthStore()
  return user
}
