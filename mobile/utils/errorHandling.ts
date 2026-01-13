/**
 * Error Handling Utilities
 * Helper functions for API error handling
 */

import { ApiError } from '../types';
import { AxiosError } from 'axios';

/**
 * Extract error message from API error
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  // Axios error
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response?.data?.detail) {
      const detail = axiosError.response.data.detail;
      
      // Handle validation errors (array format)
      if (Array.isArray(detail)) {
        return detail.map(err => err.msg).join(', ');
      }
      
      // Handle string errors
      return detail;
    }
    
    if (axiosError.message) {
      return axiosError.message;
    }
  }

  // Regular error
  if (error instanceof Error) {
    return error.message;
  }

  // Unknown error
  return String(error);
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;
    return !axiosError.response && !!axiosError.request;
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status === 401 || axiosError.response?.status === 403;
  }
  return false;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (error instanceof Error && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.status === 422 || Array.isArray(axiosError.response?.data?.detail);
  }
  return false;
}
