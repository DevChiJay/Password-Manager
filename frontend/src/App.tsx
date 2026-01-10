import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useEffect } from 'react'

import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useAuthStore } from '@/stores/authStore'

function App() {
  const { hydrate } = useAuthStore()

  // Hydrate auth state on app load
  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <Router>
      <div className="min-h-screen">
        {/* Toast notifications */}
        <Toaster position="top-right" richColors />
        
        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
