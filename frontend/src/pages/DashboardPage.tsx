import { useLogout, useUser } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { KeyRound, LogOut, User } from 'lucide-react'

export default function DashboardPage() {
  const user = useUser()
  const logout = useLogout()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Password Manager</h1>
              <p className="text-sm text-gray-600">Your secure vault</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Welcome Back!
            </CardTitle>
            <CardDescription>
              You are logged in as <strong>{user?.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <h3 className="font-semibold text-success-900 mb-2">
                ✅ Phase 2 Complete: Authentication & Authorization
              </h3>
              <ul className="text-sm text-success-800 space-y-1 ml-4">
                <li>• Auth Store (Zustand) with persistence</li>
                <li>• Login & Register pages with validation</li>
                <li>• Protected routes</li>
                <li>• JWT token management</li>
                <li>• Automatic token refresh</li>
                <li>• Password strength indicator</li>
              </ul>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h3 className="font-semibold text-primary-900 mb-2">
                🚧 Next: Phase 3 - Dashboard Core Features
              </h3>
              <ul className="text-sm text-primary-800 space-y-1 ml-4">
                <li>• Dashboard layout with sidebar & navbar</li>
                <li>• Password entries table</li>
                <li>• Search functionality</li>
                <li>• CRUD operations for password entries</li>
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>User Details:</strong>
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-gray-600">User ID:</span> <code className="bg-gray-100 px-2 py-1 rounded">{user?.user_id}</code></p>
                <p><span className="text-gray-600">Email:</span> {user?.email}</p>
                {user?.username && (
                  <p><span className="text-gray-600">Username:</span> {user.username}</p>
                )}
                <p><span className="text-gray-600">Account Created:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                <p><span className="text-gray-600">Status:</span> <span className="text-success-600 font-semibold">{user?.is_active ? 'Active' : 'Inactive'}</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
