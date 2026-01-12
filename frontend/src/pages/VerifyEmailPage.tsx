import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2, XCircle, Mail } from 'lucide-react'
import { verifyEmail } from '@/api/auth'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError('Invalid verification link')
        setIsLoading(false)
        toast.error('Invalid verification link')
        return
      }

      try {
        await verifyEmail(token)
        setIsSuccess(true)
        toast.success('Email verified successfully!')
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } catch (error: unknown) {
        const errorMsg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to verify email. Link may be expired or invalid.'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [token, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
            <CardTitle className="text-2xl">Verifying Your Email</CardTitle>
            <CardDescription>
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Email Verified!</CardTitle>
            <CardDescription>
              Your email has been successfully verified. You can now log in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Redirecting to login page...
            </p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Verification Failed</CardTitle>
            <CardDescription>
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Need a new verification link?
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    The link may have expired. You can request a new one from the login page.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button onClick={() => navigate('/login')} className="w-full">
                Go to Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
                variant="outline"
                className="w-full"
              >
                Create New Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
