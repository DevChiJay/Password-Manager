/**
 * useAuth Hook
 * React Query hook for authentication operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/api';
import { queryKeys } from '../utils/queryClient';
import { UserLoginRequest, UserRegisterRequest } from '../types';

export function useAuth() {
  const queryClient = useQueryClient();

  // Get current user
  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => authService.getMe(),
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: UserLoginRequest) => authService.login(credentials),
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: UserRegisterRequest) => authService.register(data),
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });

  // Resend verification mutation
  const resendVerificationMutation = useMutation({
    mutationFn: (email: string) => authService.resendVerification(email),
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword({ email }),
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (data: { token: string; new_password: string }) => 
      authService.resetPassword(data),
  });

  return {
    // User data
    user,
    isLoadingUser,
    userError,
    isAuthenticated: !!user,

    // Mutations
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    verifyEmail: verifyEmailMutation.mutateAsync,
    isVerifyingEmail: verifyEmailMutation.isPending,
    verifyEmailError: verifyEmailMutation.error,

    resendVerification: resendVerificationMutation.mutateAsync,
    isResendingVerification: resendVerificationMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutateAsync,
    isSendingResetEmail: forgotPasswordMutation.isPending,

    resetPassword: resetPasswordMutation.mutateAsync,
    isResettingPassword: resetPasswordMutation.isPending,
    resetPasswordError: resetPasswordMutation.error,
  };
}
