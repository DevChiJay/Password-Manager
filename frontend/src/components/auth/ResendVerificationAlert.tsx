import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Loader2 } from 'lucide-react'
import { resendVerification } from '@/api/auth'

interface ResendVerificationAlertProps {
  email: string
}

export default function ResendVerificationAlert({ email }: ResendVerificationAlertProps) {
  const [isResending, setIsResending] = useState(false)
  const [hasSent, setHasSent] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    try {
      await resendVerification(email)
      setHasSent(true)
      toast.success('Verification email sent!', {
        description: 'Please check your inbox.',
      })
    } catch {
      toast.error('Failed to send verification email')
    } finally {
      setIsResending(false)
    }
  }

  if (hasSent) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <Mail className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Verification email sent! Please check your inbox and spam folder.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="bg-yellow-50 border-yellow-200">
      <Mail className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            Your email is not verified. Check your inbox or request a new verification link.
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleResend}
            disabled={isResending}
            className="ml-2 border-yellow-300 hover:bg-yellow-100"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend'
            )}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
