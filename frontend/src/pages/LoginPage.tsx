import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail, KeyRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ResendVerificationAlert from '@/components/auth/ResendVerificationAlert'
import { useLogin, useIsAuthenticated } from '@/hooks/useAuth'
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema'

export default function LoginPage() {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const login = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const [showVerificationAlert, setShowVerificationAlert] = useState(false)
  const [emailForVerification, setEmailForVerification] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const email = watch('email', '')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  // Check for verification error
  useEffect(() => {
    if (login.isError && login.error) {
      const errorMessage = (login.error as any)?.response?.data?.detail || ''
      if (errorMessage.toLowerCase().includes('verify')) {
        setShowVerificationAlert(true)
        setEmailForVerification(email)
      } else {
        setShowVerificationAlert(false)
      }
    }
  }, [login.isError, login.error, email])

  const onSubmit = (data: LoginFormData) => {
    setShowVerificationAlert(false)
    login.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Password Manager</CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to manage your passwords securely
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Verification Alert */}
            {showVerificationAlert && emailForVerification && (
              <ResendVerificationAlert email={emailForVerification} />
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  {...register('email')}
                  disabled={login.isPending}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-danger-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...register('password')}
                  disabled={login.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-danger-600">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700"
              disabled={login.isPending}
            >
              {login.isPending ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
